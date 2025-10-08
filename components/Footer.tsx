
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary mt-12">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-text-secondary">
        <p>&copy; {new Date().getFullYear()} Dhaka College Cultural Club. All rights reserved.</p>
        <p className="mt-1 text-xs">Developed with ❤️ for the love of culture.</p>
      </div>
    </footer>
  );
};
