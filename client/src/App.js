import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const searchParams = new URLSearchParams(window.location.search);
  const name = searchParams.get('name');
  const room = searchParams.get('room');

  if (!name || !room) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
