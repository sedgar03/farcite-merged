import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My React App</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:text-indigo-200">Home</a></li>
            <li><a href="/about" className="hover:text-indigo-200">About</a></li>
            <li><a href="/contact" className="hover:text-indigo-200">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;