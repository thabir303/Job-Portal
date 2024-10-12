import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-600 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Hunt</h2>
            <p className="mb-4">Connecting talent with opportunities.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-blue-600 transition-colors duration-300" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-blue-400 transition-colors duration-300" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-blue-700 transition-colors duration-300" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-gray-800 transition-colors duration-300">Home</Link></li>
              <li><Link to="/jobs" className="hover:text-gray-800 transition-colors duration-300">Jobs</Link></li>
              <li><Link to="/companies" className="hover:text-gray-800 transition-colors duration-300">Companies</Link></li>
              <li><Link to="/about" className="hover:text-gray-800 transition-colors duration-300">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="hover:text-gray-800 transition-colors duration-300">Blog</Link></li>
              <li><Link to="/faq" className="hover:text-gray-800 transition-colors duration-300">FAQ</Link></li>
              <li><Link to="/privacy" className="hover:text-gray-800 transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-gray-800 transition-colors duration-300">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a href="mailto:info@jobhunt.com" className="hover:text-gray-800 transition-colors duration-300">info@jobhunt.com</a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <a href="tel:+1234567890" className="hover:text-gray-800 transition-colors duration-300">+1 (234) 567-890</a>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1" />
                <span>123 Job Street, Career City, 12345, Country</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-sm text-center">
          <p>&copy; {currentYear} Job Hunt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;