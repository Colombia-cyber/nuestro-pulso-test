import React, { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && !e.target.closest('nav')) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && open) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <nav 
      className={`sticky top-0 z-50 py-3 px-4 flex items-center justify-between shadow-lg font-inter transition-all duration-300 ${
        scrolled 
          ? 'bg-gradient-to-r from-yellow-400/95 via-blue-600/95 to-red-600/95 backdrop-blur-md' 
          : 'bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo and Brand */}
      <div className="flex items-center gap-3 animate-fade-in-down">
        <span className="text-2xl animate-pulse-soft" role="img" aria-label="Colombian flag">🇨🇴</span>
        <Link 
          href="/" 
          className="text-xl md:text-2xl font-bold text-white drop-shadow-lg hover:scale-105 transition-transform duration-200 focus-ring"
          aria-label="Nuestro Pulso - Go to homepage"
        >
          Nuestro Pulso
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6 animate-fade-in-down" style={{animationDelay: '0.2s'}}>
        {navLinks.map((link, index) => (
          <Link
            key={link.name}
            href={link.href}
            className="nav-link-effect text-white font-semibold hover:text-yellow-200 hover:scale-105 transition-all duration-200 px-3 py-2 rounded-md hover:bg-white/10 focus-ring"
            style={{animationDelay: `${0.1 * (index + 3)}s`}}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Sign In Button and Mobile Menu */}
      <div className="flex items-center gap-3 animate-fade-in-down" style={{animationDelay: '0.4s'}}>
        {/* Enhanced Sign In Button */}
        <Link
          href="/signin"
          className="hidden md:flex items-center gap-2 bg-white/95 hover:bg-white text-blue-600 font-semibold px-5 py-3 rounded-xl shadow-md hover:shadow-lg button-hover-effect focus-ring"
          aria-label="Sign in to your account"
        >
          <FiUser size={18} />
          <span>Sign In</span>
        </Link>

        {/* Enhanced Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-3 hover:bg-white/10 rounded-xl transition-all duration-200 focus-ring"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <div className="relative">
            <FiMenu 
              size={24} 
              className={`transition-all duration-300 ${open ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} 
            />
            <FiX 
              size={24} 
              className={`absolute top-0 left-0 transition-all duration-300 ${open ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} 
            />
          </div>
        </button>
      </div>

      {/* Enhanced Mobile Menu */}
      <div 
        id="mobile-menu"
        className={`absolute top-full left-0 w-full bg-gradient-to-r from-yellow-400/98 via-blue-600/98 to-red-600/98 backdrop-blur-md shadow-2xl md:hidden transition-all duration-300 transform ${
          open 
            ? 'opacity-100 translate-y-0 visible' 
            : 'opacity-0 -translate-y-4 invisible'
        }`}
        role="menu"
        aria-hidden={!open}
      >
        <div className="flex flex-col items-center py-6">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-white font-semibold py-4 px-6 hover:bg-white/10 transition-all duration-200 w-full text-center focus-ring animate-fade-in-up ${
                open ? '' : 'pointer-events-none'
              }`}
              style={{animationDelay: `${0.1 * (index + 1)}s`}}
              onClick={() => setOpen(false)}
              role="menuitem"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/signin"
            className={`flex items-center justify-center gap-2 bg-white/95 hover:bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl shadow-md hover:shadow-lg button-hover-effect mt-4 mx-4 focus-ring animate-fade-in-up ${
              open ? '' : 'pointer-events-none'
            }`}
            style={{animationDelay: '0.7s'}}
            onClick={() => setOpen(false)}
            role="menuitem"
          >
            <FiUser size={18} />
            <span>Sign In</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}