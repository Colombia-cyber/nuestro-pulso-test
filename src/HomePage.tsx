import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Bienvenido a Nuestro Pulso
      </h1>
      <p className="text-gray-600">
        La plataforma cívica de Colombia para participar en el diálogo nacional.
      </p>
    </div>
  );
};

export default HomePage;