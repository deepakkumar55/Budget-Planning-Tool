import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Budget from './pages/Budget';
import Expenses from './pages/Expenses';
import Income from './pages/Income';
import Goals from './pages/Goals';
import LoginForm from './components/LoginForm';
import LogoutButton from './components/LogoutButton';

const AppContent = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <a href="/" className="text-2xl font-bold flex items-center space-x-2">
            <i className="fas fa-coins text-yellow-300 text-3xl"></i>
            <span>Budget Planner</span>
          </a>
          <button
            className="text-white md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className={`md:flex ${isOpen ? 'block' : 'hidden'} space-x-4`}>
            <a href="/budget" className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg transition">
              <i className="fas fa-wallet"></i>
              <span className="ml-2">Manage Budgets</span>
            </a>
            <a href="/expenses" className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg transition">
              <i className="fas fa-tags"></i>
              <span className="ml-2">Track Expenses</span>
            </a>
            <a href="/income" className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg transition">
              <i className="fas fa-dollar-sign"></i>
              <span className="ml-2">Manage Income</span>
            </a>
            <a href="/goals" className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg transition">
              <i className="fas fa-bullseye"></i>
              <span className="ml-2">Set Goals</span>
            </a>
            {!user ? (
              <a href="/login" className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg transition">
                <i className="fas fa-sign-in-alt"></i>
                <span className="ml-2">Login</span>
              </a>
            ) : (
              <div className="flex items-center space-x-4">
                <img src={user.photoURL} alt="User Avatar" className="w-8 h-8 rounded-full" />
                <span className="text-white hidden md:inline">Welcome, {user.displayName}</span>
                <LogoutButton />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow p-6 bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/income" element={<Income />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-4 mt-4">
        <p>&copy; {new Date().getFullYear()} Budget Planner. All rights reserved.</p>
      </footer>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <AppContent />
    </Router>
  </AuthProvider>
);

export default App;
