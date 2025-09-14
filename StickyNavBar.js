import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";

const navLinks = [
  { name: "Chat", href: "#chat" },
  { name: "Debate", href: "#debate" },
  { name: "Encuestas", href: "#encuestas" },
  { name: "Survey", href: "#survey" },
  { name: "News", href: "#news" },
  { name: "Comments", href: "#comments" },
  { name: "Care", href: "#care" },
];

export default function StickyNavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600 py-2 px-4 flex items-center justify-between shadow-lg font-inter">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🇨🇴</span>
        <span className="text-xl md:text-2xl font-bold text-white drop-shadow">Nuestro Pulso</span>
      </div>
      <div className="hidden md:flex gap-6">
        {navLinks.map(link => (
          <a
            key={link.name}
            href={link.href}
            className="text-white font-semibold hover:underline"
          >
            {link.name}
          </a>
        ))}
      </div>
      <button
        className="md:hidden text-white"
        onClick={() => setOpen(!open)}
        aria-label="Open menu"
      >
        <FiMenu size={28} />
      </button>
      {open && (
        <div className="absolute top-full left-0 w-full bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600 flex flex-col items-center py-2 md:hidden">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="text-white font-semibold py-2"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}