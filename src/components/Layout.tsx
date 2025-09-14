import React from 'react';
import { Navbar } from './Navbar';
import Footer from './Footer';
import HeroSection from './HeroSection';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {isHome && <HeroSection />}
      <main className={`${isHome ? 'pt-0' : 'pt-24'} pb-16`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;