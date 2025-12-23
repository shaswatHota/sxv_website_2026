"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { clubs } from "@/utils/clubData";

// --- SUB-COMPONENTS ---

const SamuraiCrest = () => (
  <div className="w-48 h-48 relative flex items-center justify-center">
      <div className="absolute inset-0 bg-[#500000] blur-[50px] opacity-40 animate-pulse"></div>
      <img 
        src="https://images.unsplash.com/photo-1590786024443-34e8d350b288?auto=format&fit=crop&w=400&q=80" 
        alt="Samurai Crest" 
        className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_15px_rgba(100,0,0,0.8)] mix-blend-screen opacity-90 contrast-125 hover:scale-110 transition-transform duration-500"
      />
  </div>
);

const GlitchingTitle = () => {
    const [lang, setLang] = useState('EN');
    const [glitch, setGlitch] = useState(false);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setGlitch(true);
        setTimeout(() => setLang(prev => prev === 'EN' ? 'JP' : 'EN'), 200); 
        setTimeout(() => setGlitch(false), 800); 
      }, 3500);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="relative pt-20">
        <h1 
            className={`text-4xl md:text-7xl text-[#e5e5e5] uppercase tracking-wider relative z-10 text-center ${glitch ? 'glitch-active' : ''}`} 
            style={{ fontFamily: '"Shojumaru", cursive' }}
            data-text={lang === 'EN' ? "CLUBS & SOCIETIES" : "委員会とクラブ"}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#b30000] to-[#500000]">
            {lang === 'EN' ? "CLUBS & SOCIETIES" : "委員会とクラブ"}
          </span>
        </h1>
      </div>
    );
};

export default function ClubsPage() {
  const [showAll, setShowAll] = useState(false);
  const visibleClubs = showAll ? clubs : clubs.slice(0, 8);

  return (
    <div className="min-h-screen bg-[#050000] text-[#cfcfcf] overflow-x-hidden relative font-sans">
      
      {/* GLOBAL STYLES INJECTION */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Shojumaru&family=Noto+Sans+JP:wght@300;700&display=swap');
        
        .writing-vertical-rl { writing-mode: vertical-rl; text-orientation: upright; }
        .bg-seigaiha {
            background-color: #050000;
            background-image: radial-gradient(circle at 100% 150%, #1a0505 24%, transparent 40%), radial-gradient(circle at 0 150%, #1a0505 24%, transparent 40%);
            background-size: 100px 50px;
            opacity: 0.4;
        }
        .glitch-active::before, .glitch-active::after {
          content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; opacity: 0.8;
        }
        .glitch-active::before { text-shadow: -2px 0 #700808; clip: rect(44px, 999px, 56px, 0); animation: glitch-anim-1 2s infinite linear alternate-reverse; }
        @keyframes glitch-anim-1 { 0% { clip: rect(20px, 9999px, 10px, 0); } 100% { clip: rect(60px, 9999px, 70px, 0); } }
      `}</style>

      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 bg-seigaiha z-0 pointer-events-none"></div>

      <main className="relative z-10 flex flex-col items-center p-6 md:p-12">
        
        <header className="text-center mb-24 max-w-4xl relative w-full">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 opacity-90"><SamuraiCrest /></div>
          <GlitchingTitle />
          <p className="text-[#6b4c4c] mt-8 max-w-lg mx-auto text-sm tracking-wide border-t border-[#2e0e0e] pt-6">
            Explore the vibrant student communities of VSSUT. Forge your legacy.
          </p>
        </header>

        {/* CLUBS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-[1400px]">
          {visibleClubs.map((club) => (
            <article key={club.id} className="group relative bg-[#0f0a0a] border border-[#2e0e0e] overflow-hidden flex flex-col h-[400px] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(80,0,0,0.5)]">
              
              {/* Japanese vertical tag */}
              <div className="absolute top-4 right-4 bg-black/90 border border-[#8b5a2b] text-[#8b5a2b] font-bold text-sm py-2 px-1 writing-vertical-rl z-20 group-hover:bg-[#500000] group-hover:text-white">
                {club.jpName || "部員"}
              </div>

              {/* Image */}
              <div className="relative w-full h-[180px] overflow-hidden border-b-[3px] border-[#500000]">
                <Image 
                  src={club.image} 
                  alt={club.name} 
                  fill 
                  className="object-cover brightness-[0.7] group-hover:scale-110 group-hover:brightness-100 transition-all duration-700"
                />
                <div className="absolute -bottom-2 -left-1 text-[3.5rem] font-black text-white/5 pointer-events-none group-hover:text-white/20" style={{ fontFamily: '"Shojumaru", cursive' }}>
                  {club.overlayChar || "祭"}
                </div>
              </div>

              {/* Info */}
              <div className="flex-grow p-5 flex flex-col justify-between relative">
                <div className="absolute bottom-4 right-4 w-10 h-10 border-2 border-[#700808] rounded text-[#700808] flex items-center justify-center font-black text-sm opacity-20 -rotate-6">
                  {club.hanko || "印"}
                </div>
                <div>
                  <h3 className="text-xl text-white mb-2 uppercase leading-tight" style={{ fontFamily: '"Shojumaru", cursive' }}>{club.name}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{club.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* SHOW MORE BUTTON */}
        {!showAll && (
          <button 
            onClick={() => setShowAll(true)}
            className="mt-16 px-10 py-4 bg-[#500000] text-white font-bold tracking-[0.3em] uppercase hover:bg-[#8b0000] transition-colors skew-x-[-10deg]"
            style={{ fontFamily: '"Shojumaru", cursive' }}
          >
            Explore All Clubs
          </button>
        )}

      </main>
    </div>
  );
}