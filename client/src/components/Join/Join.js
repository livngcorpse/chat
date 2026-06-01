import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Join.css';

const PREDEFINED_ROOMS = [
  { id: 'general', name: 'General', description: 'Talk about anything' },
  { id: 'tech', name: 'Technology', description: 'Tech discussions and news' },
  { id: 'random', name: 'Random', description: 'Random conversations' },
  { id: 'music', name: 'Music', description: 'Share and discuss music' },
  { id: 'sports', name: 'Sports', description: 'Sports talk' },
];

export default function Join({ onJoin }) {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [error, setError] = useState('');
  const [showRooms, setShowRooms] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear error when navigating away
    return () => setError('');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !room) {
      setError('Username and room are required.');
      return;
    }

    if (name.length < 2) {
      setError('Username must be at least 2 characters.');
      return;
    }

    if (room.length < 2) {
      setError('Room name must be at least 2 characters.');
      return;
    }

    setError('');
    navigate(`/chat?name=${encodeURIComponent(name)}&room=${encodeURIComponent(room)}`);
    if (onJoin) {
      onJoin({ name, room });
    }
  };

  const handleRoomSelect = (roomId) => {
    setRoom(roomId);
    setError('');
    setShowRooms(false);
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <div className="headerSection">
          <h1 className="heading">Welcome to Chat!</h1>
          <p className="joinInstructions">Enter a name and room to join the conversation</p>
        </div>

        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (error) setError('');
            }}
            maxLength={20}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
          />
        </div>

        <div className="roomSelectorContainer">
          <input
            placeholder="Room (type or select)"
            className="joinInput"
            type="text"
            value={room}
            onFocus={() => setShowRooms(true)}
            onChange={(event) => {
              setRoom(event.target.value);
              if (error) setError('');
            }}
            maxLength={20}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setShowRooms(!showRooms);
            }}
          />
          <button
            className="roomSelectButton"
            onClick={() => setShowRooms(!showRooms)}
            type="button"
          >
            {showRooms ? '▼' : '▲'}
          </button>

          {showRooms && (
            <div className="predefinedRooms">
              {PREDEFINED_ROOMS.map((r) => (
                <div
                  key={r.id}
                  className="roomOption"
                  onClick={() => handleRoomSelect(r.id)}
                >
                  <span className="roomOptionName">{r.name}</span>
                  <span className="roomOptionDesc">{r.description}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="button mt-20" onClick={handleSubmit} type="submit">
          Sign In
        </button>

        {error && <p className="errorText">{error}</p>}

        <div className="footerSection">
          <p className="joinInstructions">Or create your own room!</p>
          <p className="joinInstructions hint">
            Tip: Use the room selector to join predefined rooms
          </p>
        </div>
      </div>
    </div>
  );
}
