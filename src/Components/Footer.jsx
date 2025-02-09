import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-300 text-sm">
          &copy; 2025 MedanLandProperty. All rights reserved.
        </div>
        <ul className="flex space-x-4 mt-4 md:mt-0">
          <li>
            <a href="/privacy" className="text-gray-300 hover:text-white transition duration-300">Privacy Policy</a>
          </li>
          <li>
            <a href="/terms" className="text-gray-300 hover:text-white transition duration-300">Terms of Service</a>
          </li>
          <li>
            <a href="/contact" className="text-gray-300 hover:text-white transition duration-300">Contact Us</a>
          </li>
        </ul>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="https://medanlandproperty.vercel.app/images/facebook-icon.svg" alt="Facebook" className="w-6 h-6"/>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="https://medanlandproperty.vercel.app/images/x-icon.svg" alt="Twitter" className="w-6 h-6"/>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="https://medanlandproperty.vercel.app/images/ig-icon.svg" alt="Instagram" className="w-6 h-6"/>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
