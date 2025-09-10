import React from 'react';
import HeroSection from './components/HeroSection';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
    </div>
  );
};

export default HomePage;