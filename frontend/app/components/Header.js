"use client"; // Add this at the top

import { useState, useEffect } from "react";
import Link from "next/link"; // Import Link from Next.js
import Cookies from 'js-cookie'; // Import js-cookie to manage cookies

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // Notification state
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false); // State for authentication menu
  const [token, setToken] = useState(null); // State for the authentication token

  useEffect(() => {
    // Check for the token when the component mounts
    const authToken = Cookies.get('token'); // Replace 'token' with your actual token name
    setToken(authToken); // Set the token state
  }, []);

  const handleLogout = () => {
    // Clear the token and any other necessary cleanup
    Cookies.remove('token'); // Remove the token cookie
    setToken(null); // Clear the token state
    setIsAuthMenuOpen(false); // Close the auth menu on logout
  };

  return (
    <header className="bg-purple-600 text-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center relative">

        {/* Hamburger Menu for Mobile */}
        <div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Logo and Name (Centered) */}
       <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
      <Link href="/" passHref>
       <h1 className="text-4xl font-bold text-white cursor-pointer">EduConnect</h1>
      </Link>
      </div> 

        {/* Right side: Notification & Login/Logout */}
        <div className="flex items-center space-x-4 relative">
          {/* Notification Icon */}
          <button onClick={() => setIsNotificationOpen(!isNotificationOpen)} className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405a2.032 2.032 0 01-.595-1.415V11a5.002 5.002 0 00-4-4.9V5a1 1 0 00-2 0v1.1A5.002 5.002 0 007 11v3.18c0 .53-.21 1.04-.595 1.415L5 17h5m-1 4h6m2 0H6" />
            </svg>
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-4">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <p className="text-sm text-gray-700">You have no new messages!</p>
              </div>
            )}
          </button>

          {/* Login/Logout Button with Dropdown */}
          <div className="relative">
            <button onClick={() => {
              if (token) {
                handleLogout();
              } else {
                setIsAuthMenuOpen(!isAuthMenuOpen);
              }
            }} className="border border-white text-white py-1 px-2 rounded hover:bg-black hover:text-white transition text-sm">
              {token ? 'Logout' : 'Login'}
            </button>
            
            {/* Dropdown Menu for Login */}
            {!token && isAuthMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md p-2 z-30">
                <Link href="/login">
                  <span className="block text-gray-800 hover:bg-gray-200 p-2 rounded text-sm" onClick={() => setIsAuthMenuOpen(false)}>Login</span>
                </Link>
                <Link href="/register">
                  <span className="block text-gray-800 hover:bg-gray-200 p-2 rounded text-sm" onClick={() => setIsAuthMenuOpen(false)}>Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile/Popup Menu */}
      {isMenuOpen && (
        <div className="absolute top-0 left-0 h-screen w-2/3 max-w-xs bg-gradient-to-br from-purple-700 to-blue-500 shadow-md p-6 z-20">
          <button onClick={() => setIsMenuOpen(false)} className="focus:outline-none mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <ul className="space-y-4">
            <li>
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <span className="block text-white hover:text-orange-600">Home</span>
              </Link>
            </li>
            <li><Link href="/teachingassistant" onClick={() => setIsMenuOpen(false)}><span className="block text-white hover:text-orange-600">Teaching Assistant</span></Link></li>
            <li><Link href="/todowork" onClick={() => setIsMenuOpen(false)}><span className="block text-white hover:text-orange-600">To-Do</span></Link></li>
            <li><Link href="/" onClick={() => setIsMenuOpen(false)}><span className="block text-white hover:text-orange-600">Study Buddy</span></Link></li>
            <li><Link href="/quiz" onClick={() => setIsMenuOpen(false)}><span className="block text-white hover:text-orange-600">Quiz</span></Link></li>
            <li><Link href="/connect" onClick={() => setIsMenuOpen(false)}><span className="block text-white hover:text-orange-600">Connect Globally</span></Link></li>
            <li><Link href="/career" onClick={() => setIsMenuOpen(false)}><span className="block text-white hover:text-orange-600">Career Guidance</span></Link></li>
            <li><Link href="/interview" onClick={() => setIsMenuOpen(false)}><span className="block text-white hover:text-orange-600">Interview Preparation</span></Link></li>
            <li><Link href="/" onClick={() => setIsMenuOpen(false)}><span className="block text-white hover:text-orange-600">Study Material</span></Link></li>
            <li><Link href="/" onClick={() => setIsMenuOpen(false)}><span className="block text-white hover:text-orange-600">Boost Mind</span></Link></li>
            <li><Link href="/contactus" onClick={() => setIsMenuOpen(false)}><span className="block text-white hover:text-orange-600">Contact Us</span></Link></li>
            <li><Link href="/aboutus" onClick={() => setIsMenuOpen(false)}><span className="block text-white hover:text-orange-600">About Us</span></Link></li>
            <li><Link href="/" onClick={() => setIsMenuOpen(false)}><span className="block text-white hover:text-orange-600">Help</span></Link></li>
            <li><Link href="/" onClick={() => setIsMenuOpen(false)}><span className="block text-white hover:text-orange-600">Settings</span></Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}
