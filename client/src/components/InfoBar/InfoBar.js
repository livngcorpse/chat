import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

import './InfoBar.css';

const InfoBar = ({ room, onLeave }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userName = searchParams.get('name');
    if (userName) {
      setName(userName);
    }
  }, [location.search]);

  const handleLeave = () => {
    if (onLeave) {
      onLeave();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online icon" />
        <div className="roomInfo">
          <h3>{room}</h3>
          <span className="currentUser">You: {name}</span>
        </div>
      </div>
      <div className="rightInnerContainer">
        <button className="leaveButton" onClick={handleLeave}>Leave</button>
        <a href="/" className="homeLink">
          <img src={closeIcon} alt="close icon" />
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
