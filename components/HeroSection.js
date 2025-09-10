import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMessageCircle, FiUsers, FiClipboard } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 via-blue-600 to-red-600 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-4 md:mx-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Column - Main Content */}
          <div className="glassmorphism rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="text-center lg:text-left">
              {/* Main Heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-2xl font-inter leading-tight">
                Nuestro Pulso
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-white/95 drop-shadow-lg">
                Colombia's Civic Pulse
              </h2>
              
              {/* Subtitle with Futuro theme */}
              <p className="mb-8 md:mb-12 text-lg md:text-xl lg:text-2xl text-white/90 font-light drop-shadow max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                Join civic discussions, debates, and surveys to shape the <span className="font-bold text-yellow-200">future</span> of Colombia. 
                Your voice matters in building a better tomorrow - <em className="font-semibold">nuestro futuro</em>.
              </p>

              {/* Call to Action Buttons */}
              <div className="flex flex-col md:flex-row justify-center lg:justify-start items-center gap-6 mt-8">
                <Link 
                  href="/chat"
                  className="group flex items-center gap-3 bg-white/90 hover:bg-white text-blue-700 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
                >
                  <FiMessageCircle size={24} className="group-hover:animate-pulse" />
                  <span className="text-lg">Join Chat</span>
                </Link>
                
                <Link 
                  href="/debate"
                  className="group flex items-center gap-3 bg-white/90 hover:bg-white text-red-700 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
                >
                  <FiUsers size={24} className="group-hover:animate-pulse" />
                  <span className="text-lg">Debate</span>
                </Link>
                
                <Link 
                  href="/survey"
                  className="group flex items-center gap-3 bg-white/90 hover:bg-white text-yellow-700 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
                >
                  <FiClipboard size={24} className="group-hover:animate-pulse" />
                  <span className="text-lg">Take Survey</span>
                </Link>
              </div>

              {/* Additional Info */}
              <div className="mt-12 text-white/80">
                <p className="text-sm md:text-base font-light">
                  🌟 Join thousands of Colombians making their voices heard
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Featured Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Image Container with Unity & Hope Theme */}
              <div className="glassmorphism rounded-3xl p-6 shadow-2xl backdrop-blur-lg">
                <div className="relative overflow-hidden rounded-2xl">
                  {/* Placeholder for user's image - can be replaced with image1 */}
                  <Image
                    src="/futuro-placeholder.svg"
                    alt="Unity and hope for Colombia's future - representing national pride and the vision of 'Futuro'"
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover rounded-2xl"
                    priority
                  />
                  
                  {/* Overlay with inspiring message */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 drop-shadow-lg">
                      Construyendo el Futuro
                    </h3>
                    <p className="text-sm md:text-base opacity-90 drop-shadow">
                      Unidos por Colombia, unidos por el mañana
                    </p>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="flex justify-center mt-4 space-x-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                </div>
              </div>
              
              {/* Floating elements for enhanced interactivity */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse opacity-75"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-600 rounded-full animate-bounce opacity-75"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}