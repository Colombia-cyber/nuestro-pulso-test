import React from 'react';

interface FooterProps {
  onOpenChat: () => void;
  onOpenDebates: () => void;
  onOpenNews: () => void;
  onOpenSurveys: () => void;
}

const EnhancedFooter: React.FC<FooterProps> = ({
  onOpenChat,
  onOpenDebates,
  onOpenNews,
  onOpenSurveys
}) => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Quick Actions Bar */}
      <div className="bg-gradient-to-r from-yellow-500 via-blue-600 to-red-500 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onOpenChat}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              <span>💬</span>
              <span className="font-semibold">Chat en Vivo</span>
            </button>
            
            <button
              onClick={onOpenDebates}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              <span>🗣️</span>
              <span className="font-semibold">Debates</span>
            </button>
            
            <button
              onClick={onOpenNews}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              <span>📰</span>
              <span className="font-semibold">Noticias</span>
            </button>
            
            <button
              onClick={onOpenSurveys}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              <span>📊</span>
              <span className="font-semibold">Encuestas</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🇨🇴</span>
              <div>
                <h3 className="text-xl font-bold text-yellow-400">Nuestro Pulso</h3>
                <p className="text-sm text-gray-300">Red Cívica de Colombia</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              La plataforma líder de participación cívica en Colombia. 
              Tu voz cuenta en la construcción del futuro de nuestro país.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Participation Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-400">Participa</h4>
            <div className="space-y-3">
              <button
                onClick={onOpenChat}
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                💬 Chat en Vivo
              </button>
              <button
                onClick={onOpenDebates}
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                🗣️ Debates Estructurados
              </button>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                📅 Debate Semanal
              </a>
              <button
                onClick={onOpenSurveys}
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                📊 Encuestas y Sondeos
              </button>
            </div>
          </div>

          {/* Information Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-400">Información</h4>
            <div className="space-y-3">
              <button
                onClick={onOpenNews}
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                📰 Noticias Actualizadas
              </button>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                🏛️ Seguimiento del Congreso
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                📈 Centro Electoral
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                🤖 Asistente AI
              </a>
            </div>
          </div>

          {/* Contact & Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-400">Conecta</h4>
            <div className="space-y-3">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                📧 Contacto
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                ❓ Ayuda y Soporte
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                📱 Descargar App
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                🔔 Notificaciones
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>© 2024 Nuestro Pulso</span>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Términos</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Código de Conducta</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Construyendo el futuro juntos</span>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-xs text-green-400">En línea</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;