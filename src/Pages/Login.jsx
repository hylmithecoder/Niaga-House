import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch(`https://endpoint-niaga-production.up.railway.app/users/${username}`);
      if (!response.ok) {
        throw new Error('User tidak ditemukan');
      }
      const user = await response.json();
      
      if (user.password !== password) {
        throw new Error('Password salah');
      }

      // Simpan data user dan waktu login
      const loginTime = new Date().getTime(); // Waktu saat ini dalam milidetik
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('username', username);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('loginTime', loginTime);
      // let isAuthenticated = localStorage.getItem('isAuthenticated');
      // console.log("Autentikasi: "+isAuthenticated);
      console.log('Login Time:', loginTime);
      
      navigate(`/admin/${username}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - Medan Land Property</title>
      </Helmet>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Login</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <form onSubmit={handleLogin}>
          <label className="block mb-2">
            <span className="text-gray-700">Username:</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Password:</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </label>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
    </>
  );
};

export default Login;
