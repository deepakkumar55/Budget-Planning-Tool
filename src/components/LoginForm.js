// src/components/LoginForm.js
import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

function LoginForm() {
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('Error signing in with Google: ', err.message);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Login</h2>
      <p className="mb-4 text-gray-600">Sign in with your Google account:</p>
      <button
        onClick={handleGoogleSignIn}
        className="w-full p-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300 flex items-center justify-center"
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8c0 .688.071 1.358.208 2H8v2h3.41C11.042 13.657 10 15.22 10 17c0 2.379 1.029 4.571 2.61 6.09l2.834-2.122C13.66 19.539 12.747 17.812 12.747 16c0-1.129.34-2.187.872-3H8v-2h4c0 .116.017.225.041.33C12.189 10.328 12 9.175 12 8z" />
        </svg>
        Sign in with Google
      </button>
    </div>
  );
}

export default LoginForm;
