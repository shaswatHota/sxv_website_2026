"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

// --- Events Data Configuration ---
const EVENTS_DATA = [
  {
    id: 1,
    title: "Hack For Tomorrow",
    image: "/home/hft.jpg",
    color: "#4ade80" // Greenish
  },
  {
    id: 2,
    title: "Mr. & Miss Vassaunt",
    image: "/home/mrmiss.jpg",
    color: "#f472b6" // Pinkish
  },
  {
    id: 3,
    title: "Rogue Runway",
    image: "/home/runway.jpg",
    color: "#facc15" // Yellowish
  },
  {
    id: 4,
    title: "COMING SOON",
    image: "/comingsoon.png",
    color: "#fb923c" // Orangeish
  },
  {
    id: 5,
    title: "COMING SOON",
    image: "/comingsoon.png",
    color: "#60a5fa" // Blueish
  }
];

export default function EventsSlider() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isHovered, setIsHovered] = useState(false);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  // --- Handlers ---
  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % EVENTS_DATA.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + EVENTS_DATA.length) % EVENTS_DATA.length);
  }, []);

  // --- Auto-Play Effect ---
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  };

  // Touch Swipe
  const handleTouchStart = (e: React.TouchEvent) => touchStart.current = e.targetTouches[0].clientX;
  const handleTouchMove = (e: React.TouchEvent) => touchEnd.current = e.targetTouches[0].clientX;
  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    touchStart.current = 0;
    touchEnd.current = 0;
  };

  // --- Helper for Cyclic Offset ---
  const getOffset = (index: number) => {
    const length = EVENTS_DATA.length;
    let offset = index - activeIndex;
    if (offset > length / 2) offset -= length;
    if (offset < -length / 2) offset += length;
    return offset;
  };

  return (
    <div 
      className="py-20 relative text-white flex flex-col items-center justify-center overflow-hidden font-sans"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Dark Background Overlay for Events Section */}
      <div className="absolute inset-0 bg-black/100 backdrop-blur-sm z-0"></div>
      
      <style>{`
        .smooth-transition {
          transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .image-transition {
          transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.5s ease;
        }
        .bg-text-transition {
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* --- Background Typography --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
        {EVENTS_DATA.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <h1 
              key={item.id}
              className={`absolute text-[12vw] md:text-[15vw] font-black tracking-tighter text-white/5 whitespace-nowrap bg-text-transition ${
                isActive ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-12'
              }`}
              style={{ 
                fontFamily: "'Inter', sans-serif",
                textShadow: isActive ? `0 0 100px ${item.color}40` : 'none'
              }}
            >
              {item.title}
            </h1>
          );
        })}
      </div>

      {/* --- Main Carousel Stage --- */}
      <div 
        className="relative w-full max-w-7xl h-[500px] flex items-center justify-center perspective-1000 z-20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Navigation - Left Pill */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 md:left-10 z-50 group hidden md:flex items-center gap-2 pr-4 pl-2 py-2 rounded-full border border-white/10 bg-black/20 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30"
        >
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-bold tracking-widest uppercase text-white/60 group-hover:text-white transition-colors">
            Prev
          </span>
        </button>

        {/* Navigation - Right Pill */}
        <button 
          onClick={nextSlide}
          className="absolute right-4 md:right-10 z-50 group hidden md:flex items-center gap-2 pl-4 pr-2 py-2 rounded-full border border-white/10 bg-black/20 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-white/60 group-hover:text-white transition-colors">
            Next
          </span>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </button>

        {/* --- Cards --- */}
        <div className="relative w-full h-full flex items-center justify-center">
          {EVENTS_DATA.map((item, index) => {
            const offset = getOffset(index);
            const isActive = offset === 0;
            const absOffset = Math.abs(offset);
            if (absOffset > 2) return null;

            // --- THE ROTATION LOGIC ---
            // 1. Spacing:
            let translateX = offset * 65;
            if (absOffset > 1) translateX = offset * 55;

            // 2. Scale:
            const scale = isActive ? 1 : 0.6;

            // 3. Frame Rotation:
            const rotateCard = isActive ? 0 : 90;

            // 4. Image Counter-Rotation:
            const rotateImage = -rotateCard;

            const zIndex = 50 - absOffset;
            const brightness = isActive ? 1 : 0.6;

            return (
              <div
                key={item.id}
                className="absolute w-[280px] md:w-[350px] aspect-[4/5] rounded-[32px] cursor-pointer smooth-transition will-change-transform flex items-center justify-center"
                style={{
                  transform: `translateX(${translateX}%) scale(${scale}) rotate(${rotateCard}deg)`,
                  zIndex: zIndex,
                  opacity: Math.max(0, 1 - absOffset * 0.4),
                }}
                onClick={() => setActiveIndex(index)}
              >
                <div className="w-full h-full rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative bg-gray-900 border border-white/10">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover image-transition"
                    style={{
                      // Scale 1.5 ensures corners stay covered during rotation
                      transform: `scale(1.5) rotate(${rotateImage}deg)`,
                      filter: `brightness(${brightness}) grayscale(${isActive ? 0 : 0.2})`
                    }}
                  />
                  
                  {/* Overlays */}
                  <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 transition-opacity duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`} />
                  
                  {/* Text Content */}
                  <div className={`absolute bottom-8 left-8 right-8 transition-all duration-500 transform ${
                    isActive ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-10'
                  }`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-[2px] bg-white/50"></div>
                      <p className="text-xs font-bold text-white/80 tracking-[0.2em] uppercase">Event</p>
                    </div>
                    <h3 className="text-3xl font-black text-white leading-none">{item.title}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- Mobile Indicators --- */}
      <div className="absolute bottom-10 flex gap-2 z-30 md:hidden">
        {EVENTS_DATA.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === activeIndex ? 'w-8 bg-white' : 'w-2 bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}