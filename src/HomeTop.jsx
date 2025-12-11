import React, { useState } from "react";
import { Volume2, VolumeX, MapPin } from "lucide-react";
import bgHome from "./assets/bg_home.jpeg";

export default function HomeTop() {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={bgHome}
          alt="Wedding Background"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ objectPosition: "center 35%" }} // Adjust 35% sesuai kebutuhan
        />
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header Controls */}
        <div className="p-6 flex justify-between items-start">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="space-y-8 max-w-md">
            {/* Title */}
            <div className="space-y-2">
              <p className="text-sm tracking-[0.3em] uppercase text-gray-300">
                The Wedding of
              </p>
              <h1 className="text-5xl font-serif tracking-wide">
                AINUN & FARHAN
              </h1>
            </div>

            {/* Date */}
            <p className="text-sm tracking-[0.2em] uppercase text-gray-300">
              Sabtu, 1 Februari 2026
            </p>

            {/* Spacer for image placement */}
            <div className="py-12" />

            {/* Kepada */}
            <p className="text-lg italic text-gray-200 font-serif mb-0">
              Kepada
            </p>
            <p className="text-3xl text-gray-200 font-serif">Fakhri & Istri</p>

            {/* <button
              className="
                w-40 h-10 mx-auto 
                bg-white/90 text-black text-sm font-small tracking-wider
                rounded-2xl backdrop-blur-sm
                transition-all duration-300
                hover:bg-white hover:shadow-xl hover:scale-[1.03]
                cursor-pointer
              "
            >
              Buka Undangan
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
