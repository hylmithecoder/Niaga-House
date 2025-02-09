import React, { useState } from 'react';
import { Menu, X, Home, Building, Users, Phone, LogIn } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const menuItems = [
    { title: 'Home', href: '/', icon: Home },
    { title: 'Properties', href: '/properties', icon: Building },
    { title: 'About Us', href: '/about', icon: Users },
    { title: 'Contact', href: '/contact', icon: Phone },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                RealEstatePro
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </a>
            ))}

            {/* Desktop Sign In/Register */}
            <div className="flex items-center space-x-4">    
              <a href="/admin/login">
              <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors">
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </button>
              </a>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
                <span>Register</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          {menuItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base transition-colors duration-200"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </a>
          ))}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center justify-between px-3">
            <a href='/admin/login'>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors px-3 py-2">
                <LogIn className="h-5 w-5" />                
                <span>Sign In</span>
              </button>
            </a>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;