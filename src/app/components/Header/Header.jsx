"use client"
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  // State for mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className=" shadow-lg bg-blue-400 ">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            {/* Logo */}
            <div>
              <Link href="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-white text-lg"> FINANCEBDARIJA</span>
              </Link>
            </div>
            {/* Primary Nav Items */}
            <div className="hidden md:flex items-center space-x-1 ">
              <Link href="/" className="py-2 px-2 text-white rounded-lg  font-semibold hover:bg-blue-900 hover:text-gray-300 ">
              Home
              </Link>
              <Link href="#about" className="py-2 px-2 text-white rounded-lg font-semibold hover:bg-blue-900 hover:text-gray-300 ">
                About Us
              </Link>
              <Link href="#course" className="py-2 px-2 text-white rounded-lg  font-semibold hover:bg-blue-900 hover:text-gray-300 ">
                Courses
              </Link>
              <Link href="#service" className="py-2 px-2 text-white rounded-lg  font-semibold hover:bg-blue-900 hover:text-gray-300 ">
                Podcast
              </Link>
            </div>
          </div>
          {/* Secondary Nav Items */}
          {/* <div className="hidden md:flex items-center space-x-3">
            <Link href="/" className="py-2 px-2 font-medium text-blue-900  rounded-xl hover:bg-blue-900 hover:text-white ">
              Log In
            </Link>
            <Link href="/" className="py-2 px-2 font-medium text-blue-900 rounded-xl  hover:bg-blue-900 hover:text-white ">
              Sign Up
            </Link>
          </div> */}
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button" onClick={toggleMobileMenu}>
              <svg className="w-6 h-6 text-gray-500 hover:text-blue-main"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} mobile-menu`}>
        <ul>
          <li><Link href="#about" className="block text-sm px-2 py-4 text-white hover:bg-blue-900 hover:text-gray-300 ">About Us</Link></li>
          <li><Link href="#course" className="block text-sm px-2 py-4 text-white hover:bg-blue-900 hover:text-gray-300 ">Courses</Link></li>
          <li><Link href="#service" className="block text-sm px-2 py-4 text-white hover:bg-blue-900 hover:text-gray-300 ">Podcast</Link></li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

