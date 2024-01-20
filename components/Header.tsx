"use client"
import React, { useState } from 'react';
import Logo from './logo';
import { Button } from './ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-4">
      <Logo />

      <Button variant={'ghost'}
        className="md:hidden text-gray-100 focus:outline-none"
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        ) : (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        )}
      </Button>

      {/* Navigation menu */}
      <nav className={`md:flex md:items-center space-x-2 ${isMenuOpen ? 'block' : 'hidden'}`}>
        <ul className="md:flex items-center space-x-2">
          <li className="cursor-pointer hover:text-[#1D1D1D] hover:bg-[#F2F2F2] transition duration-300 rounded-md px-4 py-2">
            Products
          </li>
          <li className="cursor-pointer hover:text-[#1D1D1D] hover:bg-[#F2F2F2] transition duration-300 rounded-md px-4 py-2">
            Marketplace
          </li>
          <li className="cursor-pointer hover:text-[#1D1D1D] hover:bg-[#F2F2F2] transition duration-300 rounded-md px-4 py-2">
            Gallery
          </li>
        </ul>

        {/* Wallet connect button (outside hamburger menu) */}
        <Button className="md:bg-gray-100 md:hover:text-gray-100 md:text-gray-900 px-4 py-2 rounded-full">
          Connect Wallet
        </Button>
      </nav>
    </header>
  );
};

export default Header;
