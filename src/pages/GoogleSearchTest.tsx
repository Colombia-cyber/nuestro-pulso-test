import React from 'react';
import GoogleWebSearchBar from '../components/GoogleWebSearchBar';

const GoogleSearchTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🔍 Prueba de Búsqueda Google
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Esta página demuestra la integración segura con Google Search API.
            Las búsquedas se procesan a través del backend para proteger las claves API.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <GoogleWebSearchBar />
        </div>
        
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">
            ✅ Implementación Segura
          </h2>
          <ul className="space-y-2 text-blue-800">
            <li>• Las claves API de Google están solo en el backend</li>
            <li>• El frontend llama al endpoint /api/search</li>
            <li>• Sin exposición de secretos en el código cliente</li>
            <li>• Fallback inteligente si las API keys no están configuradas</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GoogleSearchTest;