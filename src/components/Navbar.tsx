import React from "react";

const Navbar: React.FC = () => (
  <nav className="sticky top-0 z-50 bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600 shadow-lg flex items-center justify-between px-6 py-4 font-inter">
    <div className="flex items-center space-x-2">
      <img src="/colombia-flag.svg" alt="Colombia Flag" className="w-8 h-8" />
      <span className="text-xl font-bold text-white drop-shadow">Nuestro Pulso</span>
    </div>
    <div className="flex space-x-6">
      <a href="#chat" className="hover:underline text-white">Chat</a>
      <a href="#debate" className="hover:underline text-white">Debate</a>
      <a href="#survey" className="hover:underline text-white">Survey</a>
      <a href="#news" className="hover:underline text-white">News</a>
      <a href="#comments" className="hover:underline text-white">Comments</a>
      <a href="#care" className="hover:underline text-white">Care</a>
    </div>
  </nav>
);

export default Navbar;