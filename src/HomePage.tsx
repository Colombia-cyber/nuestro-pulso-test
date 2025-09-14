import React from 'react';
import Card from './components/Card';
import Button from './components/Button';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: '💬',
      title: 'Chat en Vivo',
      description: 'Únete a conversaciones en tiempo real sobre temas de interés nacional. Conecta con ciudadanos de todo el país.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: '🗣️',
      title: 'Debates',
      description: 'Participa en debates estructurados sobre políticas públicas. Tu opinión ayuda a dar forma al futuro de Colombia.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: '📊',
      title: 'Encuestas',
      description: 'Comparte tu opinión en encuestas sobre temas de actualidad. Cada voto cuenta para el cambio que queremos ver.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: '📈',
      title: 'Estadísticas',
      description: 'Accede a datos en tiempo real sobre participación ciudadana y tendencias políticas en Colombia.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: '🏛️',
      title: 'Seguimiento Congreso',
      description: 'Monitorea las actividades del Congreso, proyectos de ley y decisiones que afectan a todos los colombianos.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      icon: '🗳️',
      title: 'Hub Electoral',
      description: 'Información completa sobre procesos electorales, candidatos y resultados en tiempo real.',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 leading-tight">
            Bienvenido a Nuestro Pulso
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            La plataforma líder de participación cívica en Colombia. Donde tu voz se convierte en acción y el diálogo construye el futuro.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="primary" size="lg">
              🚀 Comenzar Ahora
            </Button>
            <Button variant="secondary" size="lg">
              📖 Conocer Más
            </Button>
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              hoverable
              className="group cursor-pointer h-full"
              onClick={() => console.log(`Clicked on ${feature.title}`)}
            >
              <div className={`${feature.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-3xl">{feature.icon}</span>
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${feature.color} text-center group-hover:scale-105 transition-transform duration-300`}>
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-6 text-center">
                <span className={`${feature.color} font-semibold group-hover:underline`}>
                  Explorar →
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Nuestro Impacto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <p className="text-gray-600">Ciudadanos Activos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">1.2M+</div>
              <p className="text-gray-600">Participaciones</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">300+</div>
              <p className="text-gray-600">Debates Activos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">25K+</div>
              <p className="text-gray-600">Propuestas Ciudadanas</p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para hacer la diferencia?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Únete a miles de colombianos que ya están construyendo el futuro de nuestro país.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="danger" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Crear Cuenta Gratis
            </Button>
            <Button variant="secondary" size="lg" className="border-2 border-white bg-transparent hover:bg-white hover:text-blue-600">
              Ver Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;