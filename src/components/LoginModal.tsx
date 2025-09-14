import React, { useState } from 'react';
import { useAuth } from './AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register, loginWithGoogle } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
      onClose();
      setEmail('');
      setPassword('');
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="glass-card-strong max-w-md w-full p-8 rounded-2xl animate-scale-in shadow-glow">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-5 bg-gradient-to-r from-colombian-yellow via-colombian-blue to-colombian-red rounded-sm shadow-lg"></div>
            <h2 className="text-2xl font-bold text-colombian-blue">
              {isLogin ? '¡Bienvenido!' : '¡Únete a Nosotros!'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl hover:scale-110 transition-all duration-300 rounded-full w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        <p className="text-gray-600 mb-6 text-center">
          {isLogin 
            ? 'Participa en la democracia colombiana' 
            : 'Conviértete en un ciudadano activo'
          }
        </p>

        {/* Toggle Buttons */}
        <div className="mb-6">
          <div className="flex glass-card rounded-xl p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                isLogin
                  ? 'bg-colombian-blue text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-colombian-blue'
              }`}
            >
              🔑 Iniciar Sesión
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                !isLogin
                  ? 'bg-colombian-blue text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-colombian-blue'
              }`}
            >
              ✨ Registrarse
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              📧 Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full px-4 py-3 glass-card border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-colombian-blue focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              🔒 Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 glass-card border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-colombian-blue focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl p-4 animate-slide-up">
              <p className="text-red-600 text-sm flex items-center gap-2">
                <span>⚠️</span>
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Procesando...
              </span>
            ) : (
              isLogin ? '🚀 Ingresar Ahora' : '✨ Crear Cuenta'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300/50" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 glass-card text-gray-500 rounded-full">O continúa con</span>
            </div>
          </div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full glass-card border border-white/30 text-gray-700 py-4 px-4 rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 font-semibold shadow-md hover:shadow-lg"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continuar con Google
        </button>

        {/* Civic Participation Note */}
        <div className="mt-6 glass-card p-4 rounded-xl border border-white/20">
          <p className="text-xs text-gray-600 text-center leading-relaxed">
            🇨🇴 Al registrarte, te unes a una comunidad comprometida con el diálogo cívico respetuoso y la construcción de un mejor futuro para Colombia.
          </p>
        </div>

        {/* Benefits */}
        {!isLogin && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-semibold text-gray-700 text-center">¿Por qué unirte?</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <span>💬</span> Chat cívico en vivo
              </div>
              <div className="flex items-center gap-1">
                <span>📊</span> Encuestas nacionales
              </div>
              <div className="flex items-center gap-1">
                <span>🏛️</span> Seguimiento del Congreso
              </div>
              <div className="flex items-center gap-1">
                <span>🔔</span> Alertas importantes
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;