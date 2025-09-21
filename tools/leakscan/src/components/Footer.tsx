
import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-400 flex items-center justify-center space-x-1">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>by</span>
            <a 
              href="https://denti.systems" 
              className="text-green-400 hover:text-green-300 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              DentiSystems
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
