import React, { useState } from 'react';

export default function AuthForm({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded credentials for demo purposes
    const validEmail = 'user@example.com';
    const validPassword = 'password123';

    if (isLogin) {
      if (email === validEmail && password === validPassword) {
        // Store user info in localStorage (for persistence)
        localStorage.setItem('user', JSON.stringify({ email }));
        onLogin(true); // Notify parent component of successful login
      } else {
        alert('Invalid email or password');
      }
    } else {
      // Registering logic (can be expanded with real registration functionality)
      if (email && password && name) {
        alert('Registration successful');
        setIsLogin(true); // Switch back to login form after registration
      } else {
        alert('Please fill in all fields');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">{isLogin ? 'Login' : 'Register'}</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label htmlFor="name" className="block mb-2 font-semibold">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your full name"
              className="w-full p-3 rounded-md text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div>
          <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            className="w-full p-3 rounded-md text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 font-semibold">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full p-3 rounded-md text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pink-400 hover:bg-pink-500 transition rounded-md py-3 font-semibold text-white"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <p className="mt-6 text-center">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          onClick={toggleForm}
          className="text-pink-300 font-semibold hover:underline"
        >
          {isLogin ? 'Register here' : 'Login here'}
        </button>
      </p>
    </div>
  );
}
