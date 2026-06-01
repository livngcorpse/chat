import React, { useEffect, useState } from 'react';

import './TypingIndicator.css';

const TypingIndicator = ({ typingUsers }) => {
  const [displayUsers, setDisplayUsers] = useState(typingUsers);
  const [lastTypingTime, setLastTypingTime] = useState(Date.now());

  useEffect(() => {
    setDisplayUsers(typingUsers);
    setLastTypingTime(Date.now());
  }, [typingUsers]);

  // Clear typing indicator after 1 second of inactivity
  useEffect(() => {
    if (typingUsers.length === 0) {
      const timer = setTimeout(() => {
        setDisplayUsers([]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [typingUsers]);

  const getTypingMessage = () => {
    if (displayUsers.length === 0) return null;
    if (displayUsers.length === 1) {
      return `${displayUsers[0]} is typing...`;
    }
    if (displayUsers.length === 2) {
      return `${displayUsers[0]} and ${displayUsers[1]} are typing...`;
    }
    return `${displayUsers.length} people are typing...`;
  };

  return (
    <div className="typingIndicator">
      <span className="typingText">{getTypingMessage()}</span>
    </div>
  );
};

export default TypingIndicator;
