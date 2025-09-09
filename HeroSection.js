import React from "react";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600 rounded-3xl shadow-xl overflow-hidden mt-8 mx-2 md:mx-auto">
      <div className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-lg z-0" />
      <div className="relative z-10 p-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-lg font-inter">
          Nuestro Pulso: Colombia’s Civic Pulse
        </h1>
        <p className="mb-6 text-lg md:text-xl text-white font-light drop-shadow">
          Join civic discussions, debates, and surveys to shape the future of Colombia.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
          <button className="bg-white bg-opacity-80 hover:bg-opacity-100 text-blue-700 font-bold px-6 py-3 rounded-xl shadow-lg transition">
            Join Chat
          </button>
          <button className="bg-white bg-opacity-80 hover:bg-opacity-100 text-red-700 font-bold px-6 py-3 rounded-xl shadow-lg transition">
            Debate
          </button>
          <button className="bg-white bg-opacity-80 hover:bg-opacity-100 text-yellow-700 font-bold px-6 py-3 rounded-xl shadow-lg transition">
            Take Survey
          </button>
        </div>
      </div>
    </section>
  );
}