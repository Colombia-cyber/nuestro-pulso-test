import React, { useState, useEffect } from "react";
import { FiX, FiChevronRight, FiChevronLeft, FiCheck } from "react-icons/fi";

interface TourStep {
  title: string;
  description: string;
  icon: string;
  highlight: string;
}

const OnboardingTour: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  const tourSteps: TourStep[] = [
    {
      title: "¡Bienvenido a Nuestro Pulso! 🇨🇴",
      description: "La plataforma cívica más completa de Colombia. Aquí puedes participar activamente en la construcción del futuro del país.",
      icon: "🏠",
      highlight: "Tu voz cuenta y hace la diferencia"
    },
    {
      title: "Chat en Vivo 💬",
      description: "Únete a conversaciones en tiempo real con ciudadanos de todo Colombia. Comparte ideas y debate temas importantes.",
      icon: "💬",
      highlight: "Conecta con más de 1,200 usuarios activos"
    },
    {
      title: "Debates Estructurados 🗣️",
      description: "Participa en debates organizados sobre políticas públicas, reformas y temas sociales relevantes para el país.",
      icon: "🗣️",
      highlight: "234 debates activos esperando tu participación"
    },
    {
      title: "Encuestas Ciudadanas 📊",
      description: "Comparte tu opinión en encuestas sobre temas de actualidad y ve los resultados en tiempo real.",
      icon: "📊",
      highlight: "Más de 45,000 votos registrados"
    },
    {
      title: "Noticias Verificadas 📰",
      description: "Mantente informado con noticias verificadas, análisis profundos y cobertura en tiempo real de eventos importantes.",
      icon: "📰",
      highlight: "Actualizaciones cada minuto"
    },
    {
      title: "Seguimiento al Congreso 🏛️",
      description: "Sigue la actividad legislativa, proyectos de ley, votaciones y decisiones que afectan a todos los colombianos.",
      icon: "🏛️",
      highlight: "Transparencia total en las decisiones públicas"
    },
    {
      title: "¡Estás Listo! ✨",
      description: "Ahora que conoces todas las funciones, es hora de que comiences a participar activamente en la democracia colombiana.",
      icon: "🚀",
      highlight: "Tu participación fortalece la democracia"
    }
  ];

  useEffect(() => {
    // Show tour for new users (check localStorage)
    const hasSeenTour = localStorage.getItem('nuestro-pulso-tour-seen');
    if (!hasSeenTour) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeTour = () => {
    localStorage.setItem('nuestro-pulso-tour-seen', 'true');
    setIsVisible(false);
  };

  const skipTour = () => {
    localStorage.setItem('nuestro-pulso-tour-seen', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const currentTourStep = tourSteps[currentStep];
  const isLastStep = currentStep === tourSteps.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      {/* Tour Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Header with Colombian flag gradient */}
        <div className="bg-colombia-gradient p-6 text-white text-center relative">
          <button
            onClick={skipTour}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
          
          <div className="text-6xl mb-4">{currentTourStep.icon}</div>
          <h2 className="text-2xl font-bold mb-2">{currentTourStep.title}</h2>
          
          {/* Progress indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {tourSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'bg-white scale-125'
                    : index < currentStep
                    ? 'bg-white/80'
                    : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            {currentTourStep.description}
          </p>
          
          {/* Highlight box */}
          <div className="bg-gradient-to-r from-colombia-yellow/10 via-colombia-blue/10 to-colombia-red/10 border border-colombia-blue/20 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">✨</span>
              <span className="font-semibold text-colombia-blue">
                {currentTourStep.highlight}
              </span>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <div className="flex items-center space-x-3">
              <button
                onClick={skipTour}
                className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
              >
                Saltar tour
              </button>
              
              <button
                onClick={handleNext}
                className="flex items-center space-x-2 bg-gradient-to-r from-colombia-yellow via-colombia-blue to-colombia-red text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
              >
                {isLastStep ? (
                  <>
                    <FiCheck className="w-4 h-4" />
                    <span>¡Comenzar!</span>
                  </>
                ) : (
                  <>
                    <span>Siguiente</span>
                    <FiChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Fun Colombian elements */}
        <div className="absolute top-20 left-6 w-8 h-6 bg-colombia-flag opacity-20 rounded flag-wave"></div>
        <div className="absolute bottom-20 right-6 w-6 h-4 bg-colombia-flag opacity-20 rounded flag-wave"></div>
      </div>
    </div>
  );
};

export default OnboardingTour;