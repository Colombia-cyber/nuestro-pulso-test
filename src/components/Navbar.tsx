import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white shadow-sm py-4 px-8 flex flex-row items-center justify-between fixed top-0 left-0 z-50">
      <div className="flex items-center gap-2">
        <img src="/colombia-flag.png" alt="Colombia Flag" className="w-10 h-7" />
        <span 
          onClick={() => navigate('/')}
          className="font-bold text-lg text-yellow-700 cursor-pointer hover:text-yellow-600 transition"
        >
          Nuestro Pulso
        </span>
      </div>
      <div className="flex gap-6">
        <button 
          onClick={() => navigate('/')}
          className="text-blue-900 font-medium hover:text-blue-600 transition"
        >
          Inicio
        </button>
        <button 
          onClick={() => navigate('/noticias')}
          className="text-blue-900 font-medium hover:text-blue-600 transition"
        >
          Noticias
        </button>
        <button 
          onClick={() => navigate('/debates')}
          className="text-blue-900 font-medium hover:text-blue-600 transition"
        >
          Debates
        </button>
        <button 
          onClick={() => navigate('/elecciones')}
          className="text-blue-900 font-medium hover:text-blue-600 transition"
        >
          Elecciones
        </button>
      </div>
      <div>
        <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:scale-105 transition">Ingresar</button>
      </div>
    </nav>
  );
};

export default Navbar;