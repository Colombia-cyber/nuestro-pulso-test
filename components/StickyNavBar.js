import React, { useState } from "react";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import Link from "next/link";

const navLinks = [
  { name: "Chat", href: "/chat" },
  { name: "Debate", href: "/debate" },
  { name: "Survey", href: "/survey" },
  { name: "News", href: "/news" },
  { name: "Comments", href: "/comments" },
  { name: "Care", href: "/care" },
];

export default function StickyNavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600 py-3 px-4 flex items-center justify-between shadow-lg font-inter">
      {/* Logo and Brand */}
      <div className="flex items-center gap-3">
        <span className="text-2xl">🇨🇴</span>
        <Link href="/" className="text-xl md:text-2xl font-bold text-white drop-shadow-lg hover:scale-105 transition-transform duration-200">
          Nuestro Pulso
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map(link => (
          <Link
            key={link.name}
            href={link.href}
            className="text-white font-semibold hover:text-yellow-200 hover:scale-105 transition-all duration-200 px-2 py-1 rounded-md hover:bg-white/10"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Sign In Button and Mobile Menu */}
      <div className="flex items-center gap-3">
        {/* Sign In Button */}
        <Link
          href="/signin"
          className="hidden md:flex items-center gap-2 bg-white/90 hover:bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
        >
          <FiUser size={18} />
          Sign In
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600 shadow-lg md:hidden">
          <div className="flex flex-col items-center py-4">
            {navLinks.map(link => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white font-semibold py-3 px-6 hover:bg-white/10 transition-colors duration-200 w-full text-center"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/signin"
              className="flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mt-3 mx-4"
              onClick={() => setOpen(false)}
            >
              <FiUser size={18} />
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}