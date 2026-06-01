import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

const ENDPOINT = process.env.REACT_APP_SOCKET_ENDPOINT || 'http://localhost:5000';

let socket;

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingUsers]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const nextName = searchParams.get('name') || '';
    const nextRoom = searchParams.get('room') || '';

    socket = io(ENDPOINT, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    });

    setRoom(nextRoom);
    setName(nextName);

    if (!nextName || !nextRoom) {
      navigate('/');
      return;
    }

    socket.emit('join', { name: nextName, room: nextRoom }, (error) => {
      if (error) {
        alert(error);
        navigate('/');
      }
    });

    socket.on('message', (incomingMessage) => {
      setMessages((currentMessages) => [...currentMessages, incomingMessage]);
    });

    socket.on('roomData', ({ room, users }) => {
      setUsers(users.filter(user => user !== name));
    });

    socket.on('typing', (data) => {
      if (data.isTyping) {
        setTypingUsers(prev => {
          if (prev.includes(data.user)) return prev;
          return [...prev, data.user];
        });
      } else {
        setTypingUsers(prev => prev.filter(user => user !== data.user));
      }
    });

    return () => {
      socket.off('message');
      socket.off('roomData');
      socket.off('typing');
      socket.disconnect();
    };
  }, [location.search, navigate, name, ENDPOINT]);

  useEffect(() => {
    if (socket) {
      socket.emit('typing', { isTyping: false });
    }
  }, [message]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      if (socket) {
        socket.emit('typing', { isTyping: false });
        socket.emit('sendMessage', message, () => setMessage(''));
      }
    }
  };

  const handleTyping = () => {
    if (!socket) return;
    socket.emit('typing', { isTyping: true });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleLeave = () => {
    if (socket) {
      socket.emit('sendMessage', `I'm leaving this room.`, () => {});
      socket.disconnect();
    }
    navigate('/');
  };

  const filteredUsers = users.filter(user => user.toLowerCase() !== name.toLowerCase());

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} onLeave={handleLeave} />
        <Messages
          messages={messages}
          name={name}
          formatTime={formatTime}
          typingUsers={typingUsers}
        />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          handleTyping={handleTyping}
        />
        <div className="userCountContainer">
          <span className="onlineIcon"></span>
          <span className="userCount">{filteredUsers.length} users online</span>
        </div>
      </div>
      <TextContainer users={filteredUsers} name={name} />
    </div>
  );
};

export default Chat;
