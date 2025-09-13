import React from 'react';
import { Link } from 'react-router-dom';
import { FiTwitter, FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold">🇨🇴 Nuestro Pulso</h3>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Red Cívica de Colombia - Construyendo el futuro juntos. 
              Participación ciudadana, transparencia y democracia digital.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-gray-400 hover:text-white transition-colors">
                  Chat en Vivo
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-400 hover:text-white transition-colors">
                  Noticias
                </Link>
              </li>
              <li>
                <Link to="/congress" className="text-gray-400 hover:text-white transition-colors">
                  Congreso
                </Link>
              </li>
              <li>
                <Link to="/polls" className="text-gray-400 hover:text-white transition-colors">
                  Encuestas
                </Link>
              </li>
            </ul>
          </div>

          {/* Information Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Información</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Acerca de Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Términos de Servicio
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Ayuda
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Nuestro Pulso. Todos los derechos reservados.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Construyendo democracia digital en Colombia 🇨🇴
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;