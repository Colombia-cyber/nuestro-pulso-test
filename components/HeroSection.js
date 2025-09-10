import React from "react";
import Link from "next/link";
import { FiMessageCircle, FiUsers, FiClipboard, FiArrowDown } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 via-blue-600 to-red-600 overflow-hidden">
      {/* Enhanced Background Pattern with Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        {/* Additional floating elements */}
        <div className="absolute top-32 right-1/4 w-40 h-40 bg-white rounded-full blur-2xl animate-pulse-soft" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse-soft" style={{animationDelay: '1.5s'}}></div>
      </div>

      {/* Main Content with improved animations */}
      <div className="relative z-10 glassmorphism-strong rounded-3xl p-8 md:p-12 lg:p-16 mx-4 md:mx-8 max-w-5xl shadow-2xl animate-scale-in">
        <div className="text-center">
          {/* Main Heading with improved typography */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white drop-shadow-2xl font-inter leading-tight animate-fade-in-down high-contrast">
            Nuestro Pulso
          </h1>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-6 text-white/95 drop-shadow-lg animate-fade-in-down" style={{animationDelay: '0.2s'}}>
            Colombia's Civic Pulse
          </h2>
          
          {/* Enhanced Subtitle */}
          <p className="mb-10 md:mb-14 text-xl md:text-2xl lg:text-3xl text-white/90 font-light drop-shadow max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            Join civic discussions, debates, and surveys to shape the future of Colombia. 
            <span className="block mt-2 text-lg md:text-xl text-white/80">
              Your voice matters in building a better tomorrow.
            </span>
          </p>

          {/* Enhanced Call to Action Buttons */}
          <div className="flex flex-col lg:flex-row justify-center items-center gap-6 mt-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <Link 
              href="/chat"
              className="group flex items-center gap-3 bg-white/95 hover:bg-white text-blue-700 font-bold px-10 py-5 rounded-2xl shadow-lg hover:shadow-2xl button-hover-effect focus-ring w-full lg:w-auto justify-center"
              role="button"
              tabIndex={0}
            >
              <FiMessageCircle size={28} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xl">Join Chat</span>
            </Link>
            
            <Link 
              href="/debate"
              className="group flex items-center gap-3 bg-white/95 hover:bg-white text-red-700 font-bold px-10 py-5 rounded-2xl shadow-lg hover:shadow-2xl button-hover-effect focus-ring w-full lg:w-auto justify-center"
              role="button"
              tabIndex={0}
            >
              <FiUsers size={28} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xl">Debate</span>
            </Link>
            
            <Link 
              href="/survey"
              className="group flex items-center gap-3 bg-white/95 hover:bg-white text-yellow-700 font-bold px-10 py-5 rounded-2xl shadow-lg hover:shadow-2xl button-hover-effect focus-ring w-full lg:w-auto justify-center"
              role="button"
              tabIndex={0}
            >
              <FiClipboard size={28} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xl">Take Survey</span>
            </Link>
          </div>

          {/* Enhanced Additional Info */}
          <div className="mt-14 text-white/85 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-base md:text-lg font-light">
              <span className="flex items-center gap-2">
                🌟 <span>Join thousands of Colombians making their voices heard</span>
              </span>
              <span className="hidden md:block text-white/60">•</span>
              <span className="flex items-center gap-2">
                🇨🇴 <span>Strengthening our democracy together</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce animate-fade-in-up" style={{animationDelay: '1s'}}>
        <div className="flex flex-col items-center gap-2 text-white/70">
          <span className="text-sm font-light">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center hover:border-white/70 transition-colors duration-300">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
          <FiArrowDown className="mt-1 animate-pulse" size={16} />
        </div>
      </div>

      {/* Accessibility: Skip to main content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only absolute top-4 left-4 bg-white text-blue-600 px-4 py-2 rounded-lg shadow-lg focus-ring z-50"
      >
        Skip to main content
      </a>
    </section>
  );
}