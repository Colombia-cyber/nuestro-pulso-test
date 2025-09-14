import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                <div className="w-2 h-6 bg-yellow-400 rounded-sm"></div>
                <div className="w-2 h-6 bg-blue-500 rounded-sm"></div>
                <div className="w-2 h-6 bg-red-500 rounded-sm"></div>
              </div>
              <span className="font-bold text-xl">🇨🇴 Nuestro Pulso</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              La plataforma cívica digital de Colombia. Conectamos ciudadanos con la democracia 
              a través de tecnología transparente y participación activa.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                📘 Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                🐦 Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                📸 Instagram
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/news" className="text-gray-300 hover:text-white transition">Noticias</Link></li>
              <li><Link to="/congress" className="text-gray-300 hover:text-white transition">Congreso</Link></li>
              <li><Link to="/analytics" className="text-gray-300 hover:text-white transition">Pulso Electoral</Link></li>
              <li><Link to="/legislation" className="text-gray-300 hover:text-white transition">Legislación</Link></li>
            </ul>
          </div>

          {/* Participation */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Participar</h3>
            <ul className="space-y-2">
              <li><Link to="/chat" className="text-gray-300 hover:text-white transition">Chat en Vivo</Link></li>
              <li><Link to="/debate" className="text-gray-300 hover:text-white transition">Debates</Link></li>
              <li><Link to="/survey" className="text-gray-300 hover:text-white transition">Encuestas</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Alertas</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Nuestro Pulso Colombia. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition">
                Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition">
                Términos
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition">
                Contacto
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;