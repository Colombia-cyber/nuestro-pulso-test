import React, { useState, useEffect } from 'react';
import { auth } from './firebase.js';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import AdminDashboard from './components/admin/AdminDashboard.jsx';
import EnhancedPollList from './components/polls/EnhancedPollList.jsx';
import { initializeDatabase } from './lib/database.js';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [view, setView] = useState('polls'); // 'polls' or 'admin'

  useEffect(() => {
    // Initialize database
    initializeDatabase();

    // For demo purposes, set admin state directly
    setUser({ id: 'demo-user', email: 'demo@example.com' });
    setIsAdmin(true);
    setLoading(false);

    // Set up auth listener (disabled for demo due to network restrictions)
    // const unsubscribe = onAuthStateChanged(auth, (user) => {
    //   setUser(user);
    //   setLoading(false);
    //   
    //   // For demo purposes, make any user an admin
    //   // In a real app, you'd check user roles from your database
    //   if (user) {
    //     setIsAdmin(true);
    //   }
    // });

    // Sign in anonymously for demo purposes (disabled due to network restrictions)
    // if (!user) {
    //   signInAnonymously(auth);
    // }

    // return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900">Cargando Nuestro Pulso...</h2>
          <p className="text-gray-600">Inicializando sistema de encuestas</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">
                🇨🇴 Nuestro Pulso
              </h1>
              <span className="ml-3 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                Sistema de Encuestas en Tiempo Real
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              {isAdmin && (
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setView('polls')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      view === 'polls'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    🗳️ Encuestas
                  </button>
                  <button
                    onClick={() => setView('admin')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      view === 'admin'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    ⚙️ Admin
                  </button>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">En línea</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {view === 'admin' && isAdmin ? (
          <AdminDashboard />
        ) : (
          <div className="py-8">
            <EnhancedPollList user={user} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Nuestro Pulso</h3>
              <p className="text-gray-600 text-sm">
                Sistema de encuestas en tiempo real para Colombia
              </p>
            </div>
            <div className="text-sm text-gray-500">
              <p>Características implementadas:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>✅ Creación y gestión de encuestas</li>
                <li>✅ Actualizaciones en tiempo real</li>
                <li>✅ Visualización con gráficos</li>
                <li>✅ Panel de administración</li>
                <li>✅ Segmentación de usuarios</li>
                <li>✅ Base de datos con Drizzle ORM</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;