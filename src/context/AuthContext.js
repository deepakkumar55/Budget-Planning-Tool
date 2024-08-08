// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export { AuthContext }; // Add this line to export AuthContext
