

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogoIcon } from './icons';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-gray-600 hover:text-teal-600 transition duration-300 ${isActive ? 'font-bold text-teal-600' : ''}`;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <NavLink to="/" className="flex items-center space-x-2 text-2xl font-bold text-teal-700">
            <LogoIcon className="h-8 w-8" />
            <span>PhysioCare</span>
          </NavLink>

          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/services" className={navLinkClass}>Services</NavLink>
            <NavLink to="/doctor" className={navLinkClass}>The Doctor</NavLink>
            <NavLink to="/gallery" className={navLinkClass}>Gallery</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <NavLink 
                  to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} 
                  className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 transition duration-300"
                >
                  Dashboard
                </NavLink>
                <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300">Logout</button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300">Login</NavLink>
                <NavLink to="/signup" className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 transition duration-300">Sign Up</NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;