import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-36">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">RIA.SHOP</h3>
            <p className="text-lg mb-4">Your one-stop shop for all things amazing!</p>
            <p>&copy; {new Date().getFullYear()} RIA.SHOP. All rights reserved.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul>
              <li><Link to="/home" className="hover:text-gray-400">Home</Link></li>
              <li><Link to="/shop" className="hover:text-gray-400">Shop</Link></li>
              <li><Link to="/about" className="hover:text-gray-400">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gray-400">Contact</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-gray-400">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="hover:text-gray-400">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <FaFacebookF size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <FaInstagram size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <FaTwitter size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

       
        <div className="mt-8 text-center text-sm">
          <p>Powered by RIA.SHOP - The best shopping experience</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
