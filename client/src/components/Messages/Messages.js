import React, { useState, useEffect, useRef } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';
import TypingIndicator from './TypingIndicator/TypingIndicator';

import './Messages.css';

const Messages = ({ messages, name, formatTime, typingUsers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const messagesEndRef = useRef(null);
  const searchInputRef = useRef(null);

  const filteredMessages = searchTerm
    ? messages.filter((msg) =>
        msg.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.user.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : messages;

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [filteredMessages, typingUsers]);

  return (
    <div className="messagesContainer">
      {/* Search Header */}
      <div className="messagesSearchHeader">
        <div className="messagesCount">
          Showing {filteredMessages.length} of {messages.length} messages
        </div>
        <button
          className="searchToggle"
          onClick={() => setShowSearch(!showSearch)}
          type="button"
        >
          {showSearch ? '×' : 'Search'}
        </button>
      </div>

      {/* Search Input */}
      {showSearch && (
        <div className="messagesSearch">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search messages..."
            className="searchInput"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="clearSearch"
              onClick={() => setSearchTerm('')}
              type="button"
            >
              ×
            </button>
          )}
        </div>
      )}

      <ScrollToBottom className="messages">
        <div className="messagesContent">
          {filteredMessages.length === 0 ? (
            <div className="noMessages">
              {searchTerm ? (
                <p>No messages found for "{searchTerm}"</p>
              ) : (
                <p>No messages yet. Say hello!</p>
              )}
            </div>
          ) : (
            filteredMessages.map((message, i) => (
              <div key={i}>
                <Message message={message} name={name} formatTime={formatTime} />
              </div>
            ))
          )}
          {typingUsers.length > 0 && <TypingIndicator typingUsers={typingUsers} />}
          <div ref={messagesEndRef}></div>
        </div>
      </ScrollToBottom>
    </div>
  );
};

export default Messages;
