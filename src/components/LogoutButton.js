import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const LogoutButton = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) return null; // Hide button if no user is logged in

  return (
    <motion.button
      onClick={logout}
      className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300 flex items-center"
      whileHover={{ scale: 1.1 }}
    >
      <FaSignOutAlt className="mr-2" />
      Logout
    </motion.button>
  );
};

export default LogoutButton;
