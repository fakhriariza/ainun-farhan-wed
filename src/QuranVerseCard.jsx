import React from "react";
import { Menu } from "lucide-react";
import bgHome from "./assets/bgpquran.jpeg";

export default function QuranVerseCard() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={bgHome}
          alt="Wedding Background"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 40%" }}
        />
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-end px-6 pb-12">
          <div className="space-y-6 max-w-lg">
            {/* Quran Reference */}
            <h2 className="text-3xl font-serif tracking-wide">
              Q.S. AR-RUM : 21
            </h2>

            {/* Quran Verse */}
            <p className="text-sm leading-relaxed text-gray-100">
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
              pasangan-pasangan untukmu dari jenismu sendiri, agar kamu
              cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di
              antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu
              benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang
              berpikir."
            </p>
          </div>
        </div>

        {/* TikTok Watermark */}
      </div>

      {/* Scroll Indicator (Optional) */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        </div>
      </div>
    </div>
  );
}
