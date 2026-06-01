import React, { useMemo } from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

// Generate avatar color for users
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

// Generate initials
const getInitials = (name) => {
  const parts = name.trim().split(' ');
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
};

const TextContainer = ({ users, name }) => {
  const activeUsers = useMemo(() => {
    if (!users) return [];
    return users.filter(user => user.toLowerCase() !== name.toLowerCase());
  }, [users, name]);

  const totalOnline = useMemo(() => {
    if (!users) return 0;
    return users.length;
  }, [users]);

  return (
    <div className="textContainer">
      <div>
        <h1>💬 Chat Application</h1>
        <p className="appDescription">
          Connect with friends in real-time! Built with React, Express, and Socket.IO.
        </p>
        <div className="featuresList">
          <div className="feature">🚀 Real-time messaging</div>
          <div className="feature">💬 Multi-room chat</div>
          <div className="feature">👥 User presence</div>
          <div className="feature">⌨️ Typing indicators</div>
        </div>
      </div>

      {users && (
        <div className="usersList">
          <div className="usersHeader">
            <h3>Online Users ({totalOnline})</h3>
            <span className="userCountBadge">{activeUsers.length} here</span>
          </div>

          <ul className="usersList">
            {activeUsers.length > 0 ? (
              activeUsers.map((user, index) => (
                <li key={index} className="activeItem">
                  <div
                    className="userAvatar"
                    style={{ backgroundColor: getAvatarColor(user) }}
                  >
                    {getInitials(user)}
                  </div>
                  <span className="userName">{user}</span>
                  <span className="userStatus">●</span>
                </li>
              ))
            ) : (
              <li className="noUsersMessage">No other users online</li>
            )}
          </ul>

          <div className="totalUsers">
            <div className="onlineIndicator">
              <span className="onlineDot"></span>
              <span className="onlineLabel">Everyone is online</span>
            </div>
          </div>
        </div>
      )}

      <div className="footerText">
        <p>Enjoy your chat! 🎉</p>
      </div>
    </div>
  );
};

export default TextContainer;
