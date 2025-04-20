import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        <h2 className="text-2xl text-cyan-400 font-semibold mb-2">NutriTrack</h2>
        <p className="mb-4 text-sm">Your smart food and nutrition companion.</p>
        
        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-4">
          <a href="#" className="hover:text-white transition"><FaGithub size={20} /></a>
          <a href="#" className="hover:text-white transition"><FaLinkedin size={20} /></a>
          <a href="#" className="hover:text-white transition"><FaInstagram size={20} /></a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} NutriTrack. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
