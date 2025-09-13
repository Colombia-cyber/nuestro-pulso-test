import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-white shadow-sm py-4 px-8 flex flex-row items-center justify-between fixed top-0 left-0 z-50">
      <div className="flex items-center gap-2">
        <img src="/colombia-flag.png" alt="Colombia Flag" className="w-10 h-7" />
        <span className="font-bold text-lg text-yellow-700">Nuestro Pulso</span>
      </div>
      <div className="flex gap-6">
        <a href="/" className="text-blue-900 font-medium hover:text-blue-600 transition">Inicio</a>
        <a href="/explorar" className="text-blue-900 font-medium hover:text-blue-600 transition">Explorar</a>
        <a href="/participar" className="text-blue-900 font-medium hover:text-blue-600 transition">Participar</a>
        <a href="/acerca" className="text-blue-900 font-medium hover:text-blue-600 transition">Acerca</a>
      </div>
      <div>
        <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:scale-105 transition">Ingresar</button>
      </div>
    </nav>
  );
};

export default Navbar;