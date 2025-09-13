import React from "react";
import { FiGithub, FiTwitter, FiFacebook, FiInstagram, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FiTwitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <FiFacebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <FiInstagram className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <FiGithub className="w-5 h-5" />, href: "https://github.com/Colombia-cyber/nuestro-pulso-test", label: "GitHub" }
  ];

  const quickLinks = [
    { name: "Inicio", href: "/" },
    { name: "Chat en Vivo", href: "/chat" },
    { name: "Debates", href: "/debates" },
    { name: "Encuestas", href: "/encuestas" },
    { name: "Noticias", href: "/noticias" },
    { name: "Congreso", href: "/congreso" }
  ];

  const legalLinks = [
    { name: "Términos de Uso", href: "/terminos" },
    { name: "Política de Privacidad", href: "/privacidad" },
    { name: "Código de Conducta", href: "/codigo-conducta" },
    { name: "Transparencia", href: "/transparencia" }
  ];

  const supportLinks = [
    { name: "Centro de Ayuda", href: "/ayuda" },
    { name: "Contáctanos", href: "/contacto" },
    { name: "Reportar Problema", href: "/reportar" },
    { name: "Sugerencias", href: "/sugerencias" }
  ];

  return (
    <footer className="relative bg-gradient-to-t from-black/20 to-transparent pt-16 pb-8">
      <div className="absolute inset-0 glass"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-9 bg-colombia-flag flag-wave rounded shadow-md"></div>
              <span className="font-black text-2xl gradient-text">Nuestro Pulso</span>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              La plataforma líder de participación cívica en Colombia. 
              Construyendo el futuro del país con la voz de todos los ciudadanos.
            </p>
            <div className="flex items-center space-x-2 text-white/70 mb-2">
              <FiMapPin className="w-4 h-4" />
              <span className="text-sm">Colombia, Sudamérica</span>
            </div>
            <div className="flex items-center space-x-2 text-white/70 mb-2">
              <FiMail className="w-4 h-4" />
              <span className="text-sm">hola@nuestropulso.co</span>
            </div>
            <div className="flex items-center space-x-2 text-white/70">
              <FiPhone className="w-4 h-4" />
              <span className="text-sm">+57 (1) 234-5678</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-colombia-yellow transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-colombia-yellow transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Soporte</h3>
            <ul className="space-y-2 mb-6">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-colombia-yellow transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Social media */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Síguenos</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all hover-lift"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter subscription */}
        <div className="glass p-6 rounded-2xl mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-white font-bold text-lg mb-2">
                📧 Mantente Informado
              </h3>
              <p className="text-white/70 text-sm">
                Recibe las últimas noticias y actualizaciones directamente en tu correo
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="tu-email@ejemplo.com"
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-l-full text-white placeholder-white/50 focus:outline-none focus:bg-white/20 flex-1 md:w-64"
              />
              <button className="bg-gradient-to-r from-colombia-yellow via-colombia-blue to-colombia-red text-white px-6 py-2 rounded-r-full font-semibold hover:scale-105 transition-transform">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p className="text-white/60 text-sm">
                © {currentYear} Nuestro Pulso. Todos los derechos reservados.
              </p>
              <span className="text-white/40">•</span>
              <a
                href="https://github.com/Colombia-cyber/nuestro-pulso-test"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-colombia-yellow text-sm flex items-center space-x-1 transition-colors"
              >
                <FiGithub className="w-4 h-4" />
                <span>Código Abierto</span>
              </a>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-white/60 text-sm">Hecho con ❤️ en Colombia</span>
              <div className="w-6 h-4 bg-colombia-flag rounded shadow-sm"></div>
            </div>
          </div>
        </div>

        {/* Colombian pride message */}
        <div className="text-center mt-8 pt-6 border-t border-white/10">
          <p className="text-white/50 text-xs italic">
            "El único país de Sudamérica que no tiene fronteras con Brasil, pero que comparte fronteras con el futuro"
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;