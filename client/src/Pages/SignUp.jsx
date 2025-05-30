import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCalculator } from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert('Registration Successful!');
        navigate('/login');
      } else {
        alert(data.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-[#1e293b] mt-6 mb-6 p-8 rounded-2xl shadow-lg">
        
        <div className="flex justify-center items-center mb-2 p-2 text-cyan-400 text-xl font-bold gap-2">
          <FaCalculator size={24} />
          <span>ProjectEstimator</span>
        </div>

        <h2 className="text-3xl text-center text-white font-semibold mb-6">Create an Account</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            required
            placeholder="Full Name"
            className="w-full p-3 border border-cyan-400 rounded-lg bg-gray-800 text-white"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            required
            placeholder="Email"
            className="w-full p-3 border border-cyan-400 rounded-lg bg-gray-800 text-white"
          />

          <div className="relative">
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Password"
              className="w-full p-3 border border-cyan-400 rounded-lg bg-gray-800 text-white"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3 text-gray-400 cursor-pointer"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <div className="relative">
            <input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Confirm Password"
              className="w-full p-3 border border-cyan-400 rounded-lg bg-gray-800 text-white"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3 text-gray-400 cursor-pointer"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg font-medium"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
