import React from 'react';

interface InfoBoxProps {
  title: string;
  description: string;
  icon: string;
  features: string[];
  bgColor?: string;
  textColor?: string;
}

const InfoComingSoonBox: React.FC<InfoBoxProps> = ({
  title,
  description,
  icon,
  features,
  bgColor = "bg-gradient-to-br from-blue-50 to-indigo-100",
  textColor = "text-gray-800"
}) => {
  return (
    <div className={`${bgColor} rounded-xl shadow-lg p-6 border border-blue-200 relative overflow-hidden`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent transform rotate-45"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl">{icon}</div>
          <div>
            <h3 className={`text-xl font-bold ${textColor}`}>{title}</h3>
            <div className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                🚧 EN DESARROLLO
              </span>
              <span className="text-sm text-gray-600">Próximamente</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className={`${textColor} mb-4 opacity-90`}>
          {description}
        </p>

        {/* Features list */}
        <div className="space-y-2 mb-4">
          <h4 className={`font-semibold ${textColor} mb-2`}>Características incluidas:</h4>
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-green-500 text-sm">✓</span>
              <span className={`text-sm ${textColor} opacity-80`}>{feature}</span>
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium ${textColor}`}>Progreso del desarrollo</span>
            <span className={`text-sm ${textColor} opacity-75`}>75%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full w-3/4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4 pt-4 border-t border-blue-200/50">
          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
            🔔 Notificarme cuando esté listo
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoComingSoonBox;