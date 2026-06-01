import React, { useMemo } from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

// Generate a consistent avatar color based on username
const getAvatarColor = (name) => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
    '#D4A5A5', '#9B59B6', '#3498DB', '#E67E22', '#2ECC71'
  ];
  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i);
  }
  return colors[sum % colors.length];
};

// Generate initials for avatar
const getInitials = (name) => {
  const parts = name.trim().split(' ');
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
};

const Message = ({ message: { text, user, timestamp }, name, formatTime }) => {
  const isSentByCurrentUser = useMemo(() => {
    const trimmedName = name.trim().toLowerCase();
    return user === trimmedName;
  }, [name, user]);

  const avatarColor = useMemo(() => getAvatarColor(user), [user]);
  const avatarInitials = useMemo(() => getInitials(user), [user]);

  return (
    <div className={`messageContainer ${isSentByCurrentUser ? 'justifyEnd' : 'justifyStart'}`}>
      <div className="messageContent">
        {/* Avatar for received messages */}
        {!isSentByCurrentUser && (
          <div className="avatar" style={{ backgroundColor: avatarColor }}>
            {avatarInitials}
          </div>
        )}
        <div className="messageContentBody">
          <p className={`sentText ${isSentByCurrentUser ? 'pr-10' : 'pl-10'}`}>
            {user}
            <span className="timestamp">{formatTime(timestamp)}</span>
          </p>
          <div className={`messageBox ${isSentByCurrentUser ? 'backgroundBlue' : 'backgroundLight'}`}>
            <p className={`messageText ${isSentByCurrentUser ? 'colorWhite' : 'colorDark'}`}>
              {ReactEmoji.emojify(text)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
