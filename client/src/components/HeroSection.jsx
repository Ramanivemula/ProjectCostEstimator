import React from 'react';
import image from '../assets/image.png';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="bg-black bg-opacity-80 p-6 rounded-xl text-center">
        <h1 className="text-4xl md:text-5xl p-2 font-bold mb-4 text-cyan-400">
          Project Cost Estimator
        </h1>
        <p className="text-lg md:text-xl mb-6 p-2 text-gray-300 max-w-2xl text-center">
          Automatically calculate software project costs, optimize team structure, and export client-ready reports — powered by GenAI.
        </p>
        <Link to="/register">
          <button className="bg-cyan-500 hover:bg-cyan-700 text-white px-6 py-2 rounded-xl text-lg transition-all">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
