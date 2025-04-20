import React from 'react';
import image from '../assets/image.png';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="bg-black bg-opacity-80 p-10 rounded-xl text-center">
        <h1 className="text-4xl text-6xl font-bold mb-4 text-cyan-400">
          Food Nutrient Analysis
        </h1>
        <p className="text-lg text-xl mb-6 text-gray-300 max-w-2xl text-center">
          Get instant insights about your meals, track your nutrition, and take control of your health.
        </p>
        <Link to="/register">
        <button className="bg-cyan-500 hover:bg-cyan-700 text-white px-6 py-2 rounded-xl text-lg transition-all">
        Get Started
      </button></Link>
      </div>
    </div>
  );
}

export default HeroSection;
