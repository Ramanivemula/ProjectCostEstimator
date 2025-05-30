import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCalculator } from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/dashboard');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-[#1e293b] p-8 mt-6 mb-6 rounded-2xl shadow-lg">
        {/* Brand Header */}
        <div className="flex justify-center items-center mb-2 p-2 text-cyan-400 text-xl font-bold gap-2">
          <FaCalculator size={24} />
          <span>ProjectEstimator</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl text-center p-2 text-white font-semibold mb-6">
          Log in to your account!
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-7">
          <div>
            {/* <label className="block mb-1 text-sm text-gray-300">Email</label> */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full p-3 border border-cyan-400 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            {/* <label className="block mb-1 text-sm text-gray-300">Password</label> */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full p-3 border border-cyan-400 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3 text-gray-400 cursor-pointer"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg transition font-medium"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4 text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-cyan-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
