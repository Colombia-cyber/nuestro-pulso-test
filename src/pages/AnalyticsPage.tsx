import React from 'react';
import { FiBarChart, FiTrendingUp, FiUsers, FiMapPin, FiCalendar, FiArrowUp, FiArrowDown } from 'react-icons/fi';

const AnalyticsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📈 Analíticas Públicas
          </h1>
          <p className="text-xl text-gray-600">
            Explora datos y tendencias sobre la participación ciudadana en Colombia
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">89.5%</div>
                <div className="text-sm text-gray-600">Participación Ciudadana</div>
              </div>
              <div className="flex items-center text-green-500">
                <FiArrowUp size={16} />
                <span className="text-sm">+2.3%</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">156K</div>
                <div className="text-sm text-gray-600">Usuarios Activos</div>
              </div>
              <div className="flex items-center text-green-500">
                <FiArrowUp size={16} />
                <span className="text-sm">+12%</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">2.4M</div>
                <div className="text-sm text-gray-600">Interacciones</div>
              </div>
              <div className="flex items-center text-green-500">
                <FiArrowUp size={16} />
                <span className="text-sm">+8.5%</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">72%</div>
                <div className="text-sm text-gray-600">Satisfacción</div>
              </div>
              <div className="flex items-center text-red-500">
                <FiArrowDown size={16} />
                <span className="text-sm">-1.2%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Charts */}
          <div className="lg:col-span-2">
            {/* Participation Trends */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <FiTrendingUp />
                <span>Tendencias de Participación</span>
              </h2>
              <div className="h-64 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FiBarChart size={48} className="text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600">Gráfico de participación mensual</p>
                  <p className="text-sm text-gray-500">Datos de los últimos 12 meses</p>
                </div>
              </div>
            </div>

            {/* Regional Participation */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <FiMapPin />
                <span>Participación por Región</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Bogotá D.C.</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: '92%'}}></div>
                      </div>
                      <span className="text-sm font-semibold">92%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Antioquia</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '88%'}}></div>
                      </div>
                      <span className="text-sm font-semibold">88%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Valle del Cauca</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                      <span className="text-sm font-semibold">85%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Santander</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{width: '82%'}}></div>
                      </div>
                      <span className="text-sm font-semibold">82%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Cundinamarca</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{width: '79%'}}></div>
                      </div>
                      <span className="text-sm font-semibold">79%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Atlántico</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-indigo-500 h-2 rounded-full" style={{width: '76%'}}></div>
                      </div>
                      <span className="text-sm font-semibold">76%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Bolívar</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-pink-500 h-2 rounded-full" style={{width: '73%'}}></div>
                      </div>
                      <span className="text-sm font-semibold">73%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Otros</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-500 h-2 rounded-full" style={{width: '68%'}}></div>
                      </div>
                      <span className="text-sm font-semibold">68%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Topic Engagement */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                📊 Temas Más Discutidos
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-blue-900">Reforma Educativa</div>
                    <div className="text-sm text-blue-600">2,847 interacciones</div>
                  </div>
                  <div className="text-blue-600 font-bold">🔥</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-green-900">Sistema de Salud</div>
                    <div className="text-sm text-green-600">2,156 interacciones</div>
                  </div>
                  <div className="text-green-600 font-bold">⬆️</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-purple-900">Transporte Público</div>
                    <div className="text-sm text-purple-600">1,923 interacciones</div>
                  </div>
                  <div className="text-purple-600 font-bold">📈</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-yellow-900">Medio Ambiente</div>
                    <div className="text-sm text-yellow-600">1,654 interacciones</div>
                  </div>
                  <div className="text-yellow-600 font-bold">🌱</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Real-time Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <FiUsers />
                <span>Actividad en Tiempo Real</span>
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Chat activo</span>
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">124 usuarios</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Encuestas</span>
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">89 votos</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Debates</span>
                  <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-sm">45 comentarios</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Noticias</span>
                  <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-sm">67 vistas</span>
                </div>
              </div>
            </div>

            {/* Demographics */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                👥 Demografía de Usuarios
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-2">Edad</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">18-25</span>
                      <span className="text-sm font-semibold">28%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">26-35</span>
                      <span className="text-sm font-semibold">35%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">36-50</span>
                      <span className="text-sm font-semibold">25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">50+</span>
                      <span className="text-sm font-semibold">12%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-2">Género</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Femenino</span>
                      <span className="text-sm font-semibold">52%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Masculino</span>
                      <span className="text-sm font-semibold">46%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Otro</span>
                      <span className="text-sm font-semibold">2%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Indicators */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white mb-6">
              <h3 className="text-xl font-bold mb-4">
                🎯 Indicadores Clave
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Tiempo Promedio</span>
                  <span className="font-semibold">24 min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Retención</span>
                  <span className="font-semibold">78%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Recomendación</span>
                  <span className="font-semibold">8.4/10</span>
                </div>
              </div>
            </div>

            {/* Export Data */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                📥 Exportar Datos
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Descarga reportes detallados para análisis avanzado
              </p>
              <div className="space-y-2">
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Reporte Mensual
                </button>
                <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  Datos por Región
                </button>
                <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  Análisis de Temas
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;