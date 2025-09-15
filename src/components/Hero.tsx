import React from 'react';

const Hero: React.FC = () => {
    return (
        <div className="relative min-h-[60vh] flex items-center justify-center">
            {/* Colombian gradient overlay */}
            <div className="absolute inset-0 hero-overlay rounded-2xl"></div>
            
            {/* Content */}
            <div className="relative z-10 text-center text-white px-8 max-w-4xl">
                <div className="mb-6">
                    <span className="text-8xl animate-bounce">🇨🇴</span>
                </div>
                
                <h1 className="text-6xl font-bold mb-6 drop-shadow-2xl">
                    Nuestro Pulso
                </h1>
                
                <p className="text-2xl mb-4 drop-shadow-lg font-medium">
                    Red Cívica de Colombia - Tu Voz Cuenta
                </p>
                
                <p className="text-lg mb-8 max-w-2xl mx-auto drop-shadow-md opacity-95">
                    Únete a la conversación nacional. Participa en debates, encuestas y chat en vivo para construir el futuro de Colombia juntos.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                    <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl">
                        <span className="mr-2">💬</span>
                        Chat en Vivo
                    </button>
                    <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl">
                        <span className="mr-2">🗣️</span>
                        Debates
                    </button>
                    <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl">
                        <span className="mr-2">📊</span>
                        Encuestas
                    </button>
                </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute top-20 left-20 text-6xl animate-pulse opacity-30">🏛️</div>
            <div className="absolute top-40 right-32 text-4xl animate-bounce opacity-20" style={{animationDelay: '1s'}}>📈</div>
            <div className="absolute bottom-32 left-32 text-5xl animate-pulse opacity-25" style={{animationDelay: '2s'}}>📰</div>
            <div className="absolute bottom-20 right-20 text-3xl animate-bounce opacity-30" style={{animationDelay: '0.5s'}}>🗳️</div>
        </div>
    );
};

export default Hero;