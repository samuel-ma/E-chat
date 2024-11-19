"use client";

import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-800 text-white py-8 mt-12 bottom-0 right-0 left-0 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section - Logo and Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Left Side - Contact Info */}
          <div>
            <h2 className="text-3xl font-bold">MyShop</h2>
            <p className="mt-2 text-lg text-gray-300">Your go-to shop for the best deals!</p>
            <p className="mt-4 text-gray-400 text-sm">Contact us: support@myshop.com</p>
          </div>

          {/* Middle - Quick Links */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms-of-service" className="hover:text-blue-400 transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="/about" className="hover:text-blue-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Right Side - Social Media */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-blue-600 transition-colors">
                <FaFacebook />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-blue-400 transition-colors">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-pink-500 transition-colors">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} MyShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
