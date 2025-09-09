import React from 'react';
import AuthButton from './components/AuthButton';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 h-screen flex items-center justify-center">
      {/* Auth Button positioned in the top-right corner for always visible access */}
      <div className="absolute top-6 right-6 z-10">
        <AuthButton />
      </div>
      
      <div className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-lg rounded-lg p-8 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Nuestro Pulso: Colombia's Civic Pulse
        </h1>
        <p className="mt-4 text-gray-700">
          Join civic discussions, debates, and surveys to shape the future of Colombia.
        </p>
        
        <div className="mt-6 flex justify-center gap-4">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700">
            Join Chat
          </button>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700">
            Debate
          </button>
          <button className="px-6 py-3 bg-yellow-600 text-white rounded-lg shadow-lg hover:bg-yellow-700">
            Take Survey
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
