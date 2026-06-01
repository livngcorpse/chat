import React, { useState } from 'react';

import './Input.css';

const Input = ({ setMessage, sendMessage, message, handleTyping }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    if (handleTyping) {
      handleTyping();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (handleTyping) {
      setTimeout(() => {
        handleTyping();
      }, 500);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage(event);
    } else if (handleTyping) {
      handleTyping();
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSending(true);
    try {
      await sendMessage(e);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSendMessage}>
      <div className="inputWrapper">
        <input
          className={`input ${isFocused ? 'inputFocused' : ''}`}
          type="text"
          placeholder="Type a message... (Press Enter to send)"
          value={message}
          onChange={({ target: { value } }) => {
            setMessage(value);
            if (handleTyping && value.length > 0) {
              handleTyping();
            }
          }}
          onKeyPress={handleKeyPress}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete="off"
        />
        {message && (
          <button
            className="clearButton"
            onClick={() => setMessage('')}
            type="button"
            title="Clear message"
          >
            ×
          </button>
        )}
      </div>
      <button
        className={`sendButton ${isSending ? 'sending' : ''}`}
        onClick={handleSendMessage}
        type="button"
        disabled={!message.trim() || isSending}
      >
        {isSending ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};

export default Input;
