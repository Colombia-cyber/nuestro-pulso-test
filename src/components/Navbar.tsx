import React from "react";

const Navbar: React.FC = () => (
  <nav className="sticky top-0 z-50 bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600 shadow-xl flex items-center justify-between px-8 py-5 font-inter animate-fadeIn">
    <div className="flex items-center space-x-3">
      <img src="/colombia-flag.svg" alt="Colombia Flag" className="w-10 h-10 drop-shadow-xl" />
      <span className="font-extrabold text-2xl text-white tracking-wide glow">Nuestro Pulso</span>
    </div>
    <div className="flex space-x-8">
      <a href="#news" className="tab-btn" title="Latest civic news">News</a>
      <a href="#debate" className="tab-btn" title="Debate with others">Debate</a>
      <a href="#survey" className="tab-btn" title="Take civic surveys">Survey</a>
      <a href="#chat" className="tab-btn" title="Live community chat">Chat</a>
      <a href="#comments" className="tab-btn" title="See public comments">Comments</a>
    </div>
    <style>{`
      .tab-btn { transition: all 0.2s; padding: 0.5rem 1rem; border-radius: 999px; background: rgba(0,0,0,0.08); color: #fff; font-weight: 600; box-shadow: 0 1px 6px rgba(0,0,0,0.12); }
      .tab-btn:hover { background: #fff; color: #2563eb; transform: scale(1.07); }
      .glow { text-shadow: 0 0 8px #fff, 0 0 16px #2563eb; }
      .animate-fadeIn { animation: fadeIn 1.2s; }
      @keyframes fadeIn { from { opacity: 0;} to { opacity: 1;} }
    `}</style>
  </nav>
);

export default Navbar;