import React from "react";
import { useRealtime } from "../contexts/RealtimeContext.tsx";

const Navbar: React.FC = () => {
  const { user, isOnline, notifications, onlineUsers } = useRealtime();
  const unreadNotifications = notifications.filter(n => !n.isRead).length;
  return (
    <nav className="w-full bg-white shadow-sm py-4 px-8 flex flex-row items-center justify-between fixed top-0 left-0 z-50">
      <div className="flex items-center gap-2">
        <img src="/colombia-flag.png" alt="Colombia Flag" className="w-10 h-7" />
        <span className="font-bold text-lg text-yellow-700">Nuestro Pulso</span>
        
        {/* Real-time status indicator */}
        <div className="flex items-center ml-4 space-x-2">
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-xs text-gray-600">
            {isOnline ? `${onlineUsers} en línea` : 'Sin conexión'}
          </span>
        </div>
      </div>
      
      <div className="flex gap-6">
        <a href="/" className="text-blue-900 font-medium hover:text-blue-600 transition">Inicio</a>
        <a href="/explorar" className="text-blue-900 font-medium hover:text-blue-600 transition">Explorar</a>
        <a href="/participar" className="text-blue-900 font-medium hover:text-blue-600 transition">Participar</a>
        <a href="/acerca" className="text-blue-900 font-medium hover:text-blue-600 transition">Acerca</a>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        {user && (
          <div className="relative">
            <button className="relative p-2 text-gray-600 hover:text-blue-600 transition">
              🔔
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </span>
              )}
            </button>
          </div>
        )}
        
        {/* Login/User section */}
        {user ? (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
              {user.displayName?.[0] || user.email?.[0] || '👤'}
            </div>
            <span className="text-sm text-gray-700">
              {user.displayName || user.email?.split('@')[0] || 'Usuario'}
            </span>
          </div>
        ) : (
          <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:scale-105 transition">
            Ingresar
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;