import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-[#2a165d]/80 to-[#1a174b]/80 rounded-b-3xl py-8 px-8 mt-16 text-white flex flex-col md:flex-row justify-between items-center shadow-2xl backdrop-blur-lg">
      <div className="mb-4 md:mb-0 font-bold tracking-wide text-lg flex items-center gap-2">
        <span>© 2025 Mapora.</span>
        <span className="text-pink-300">All rights reserved.</span>
      </div>
      <div className="flex gap-5 items-center">
        <a href="#" className="hover:text-pink-300 transition">Privacy Policy</a>
        <a href="#" className="hover:text-pink-300 transition">Terms</a>
        <span className="hidden md:inline-block border-l border-white/20 h-5 mx-2"></span>
        <a href="#" className="hover:text-pink-300 transition"><FaGithub size={20} /></a>
        <a href="#" className="hover:text-pink-300 transition"><FaTwitter size={20} /></a>
        <a href="#" className="hover:text-pink-300 transition"><FaLinkedin size={20} /></a>
      </div>
    </footer>
  );
}
