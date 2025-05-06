import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaStar, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import AuthForm from './Login';

export function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Optional: Prevent background scroll when modal is open
  React.useEffect(() => {
    if (showLogin) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showLogin]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
    setShowLogin(false); // Close the login modal on successful login
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="w-full px-8 py-5 flex justify-between items-center bg-gradient-to-r from-[#2a165d]/80 to-[#1a174b]/80 backdrop-blur-lg rounded-t-3xl shadow-2xl"
        style={{ borderBottom: '1.5px solid rgba(255,255,255,0.08)' }}
      >
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-400 rounded-full flex items-center justify-center font-bold text-white text-2xl shadow-lg group-hover:scale-110 transition">
            <span className="drop-shadow-lg">🌍</span>
          </div>
          <span className="text-white text-3xl font-extrabold tracking-widest group-hover:text-pink-300 transition">Mapora</span>
        </Link>
        <nav className="hidden md:flex gap-8 text-white font-medium text-lg">
          <Link to="/" className="flex items-center gap-2 hover:text-pink-300 transition"><FaHome /> Home</Link>
          <Link to="/features" className="flex items-center gap-2 hover:text-pink-300 transition"><FaStar /> Features</Link>
          <Link to="/about" className="flex items-center gap-2 hover:text-pink-300 transition"><FaInfoCircle /> About</Link>
          <Link to="/contact" className="flex items-center gap-2 hover:text-pink-300 transition"><FaEnvelope /> Contact</Link>
        </nav>

        {/* Show login button or user info based on login state */}
        {isLoggedIn ? (
          <motion.button
            whileHover={{ scale: 1.08, background: "linear-gradient(to right, #f472b6, #a78bfa)" }}
            className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-2 rounded-full text-white font-semibold shadow-xl hover:shadow-pink-300/30 transition"
            onClick={handleLogout}
          >
            Logout
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.08, background: "linear-gradient(to right, #f472b6, #a78bfa)" }}
            className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-2 rounded-full text-white font-semibold shadow-xl hover:shadow-pink-300/30 transition"
            onClick={() => setShowLogin(true)}
          >
            Get Started
          </motion.button>
        )}
      </motion.header>

      {/* Modal for Login/Register */}
      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <AuthForm onLogin={handleLogin} />
        </Modal>
      )}
    </>
  );
}

// Simple Modal Wrapper
function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-xl shadow-2xl p-0 w-full max-w-md mx-4">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-pink-500 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
