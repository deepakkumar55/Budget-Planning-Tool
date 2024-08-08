// src/components/LogoutButton.js
import React from 'react';
import { useAuth } from '../context/AuthContext'; // Ensure correct import

const LogoutButton = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    // Implement logout functionality here
  };

  return (
    user ? (
      <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
        Logout
      </button>
    ) : null
  );
};

export default LogoutButton;
