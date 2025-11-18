

import React from 'react';
import { LogoIcon } from './icons';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-teal-700">
                <LogoIcon className="h-7 w-7" />
                <span>PhysioCare</span>
            </Link>
            <p className="text-gray-500">Your partner in recovery and wellness. Providing expert physiotherapy care tailored to you.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/services" className="text-base text-gray-500 hover:text-gray-900">Services</Link></li>
              <li><Link to="/doctor" className="text-base text-gray-500 hover:text-gray-900">The Doctor</Link></li>
              <li><Link to="/gallery" className="text-base text-gray-500 hover:text-gray-900">Gallery</Link></li>
              <li><Link to="/about" className="text-base text-gray-500 hover:text-gray-900">About Us</Link></li>
              <li><Link to="/contact" className="text-base text-gray-500 hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Privacy Policy</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Terms of Service</a></li>
            </ul>
          </div>
           <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Contact Us</h3>
            <ul className="mt-4 space-y-2 text-base text-gray-500">
                <li>123 Health St, Wellness City</li>
                <li>contact@physiocare.com</li>
                <li>(123) 456-7890</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-base text-gray-400">
          &copy; {new Date().getFullYear()} PhysioCare Connect. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;