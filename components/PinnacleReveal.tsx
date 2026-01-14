"use client";

import React, { useState, useEffect } from 'react';

interface ParticleType {
  x: number;
  y: number;
  color: string;
  vx: number;
  vy: number;
  gravity: number;
  drag: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  life: number;
  decay: number;
  update(): void;
  draw(ctx: CanvasRenderingContext2D): void;
}

export default function PinnacleReveal() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showIdentityConfirmed, setShowIdentityConfirmed] = useState(false);
  const [isTimerComplete, setIsTimerComplete] = useState(false);

  // Check if timer has ended (January 16, 2026 at 12:00 AM IST)
  useEffect(() => {
    const targetTime = new Date("2026-01-16T00:00:00+05:30").getTime();
    
    const checkTimer = () => {
      const now = Date.now();
      const isComplete = now >= targetTime;
      setIsTimerComplete(isComplete);
      console.log('Pinnacle timer check:', { now, targetTime, isComplete, remaining: targetTime - now });
    };

    checkTimer();
    const interval = setInterval(checkTimer, 100); // Check more frequently (every 100ms)
    return () => clearInterval(interval);
  }, []);

  // Load state from sessionStorage on mount (persists during navigation, not on reload)
  useEffect(() => {
    const savedState = sessionStorage.getItem('pinnacleRevealed');
    if (savedState === 'true' && isTimerComplete) {
      setIsRevealed(true);
      // Apply the reveal-active class to body
      document.body.classList.add('reveal-active');
      const container = document.getElementById('card-container');
      if (container) {
        container.classList.add('reveal-active');
      }
    }
  }, [isTimerComplete]);

  const createExplosion = () => {
    const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Get the center of the revealed image
    const container = document.getElementById('card-container');
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Colors: White, Red, Brown, and deeper/lighter shades
    const colors = [
      '#ffffff', // White
      '#e0e0e0', // Light Grey/White
      '#ff4655', // Bright Red
      '#8a1c1c', // Deep Red
      '#8b7355', // Bronze/Brown
      '#5d4037', // Deep Brown
      '#c5a059'  // Gold/Light Brown
    ];

    const particles: ParticleType[] = [];

    class Particle implements ParticleType {
      x: number;
      y: number;
      color: string;
      vx: number;
      vy: number;
      gravity: number;
      drag: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      life: number;
      decay: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.color = color;
        
        // Spread particles in all directions from center
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 15 + 10;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        
        this.gravity = 0.15;
        this.drag = 0.98;
        this.size = Math.random() * 8 + 4;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
        this.life = 1.0;
        this.decay = Math.random() * 0.008 + 0.003;
      }

      update() {
        this.vx *= this.drag;
        this.vy *= this.drag;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        this.life -= this.decay;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size * 1.5);
        ctx.restore();
      }
    }

    // Create particles from center of image spreading in all directions
    for(let i = 0; i < 200; i++) {
      particles.push(new Particle(centerX, centerY, colors[Math.floor(Math.random() * colors.length)]));
    }

    const animateParticles = () => {
      if (particles.length === 0) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0) particles.splice(i, 1);
      }
      
      if (particles.length > 0) {
        requestAnimationFrame(animateParticles);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animateParticles();
  };

  const handleClick = () => {
    // Don't allow interaction if timer hasn't ended
    if (!isTimerComplete) {
      return;
    }

    if (isRevealed) {
      // Celebration logic if already revealed
      createExplosion();
      return;
    }

    setIsRevealed(true);
    setShowIdentityConfirmed(true);
    
    // Save to sessionStorage (persists during navigation, cleared on page reload)
    sessionStorage.setItem('pinnacleRevealed', 'true');
    
    // Trigger Reveal Classes with first-reveal class
    document.body.classList.add('reveal-active', 'first-reveal');
    const container = document.getElementById('card-container');
    if (container) {
      container.classList.add('reveal-active', 'first-reveal');
    }
    
    // Remove first-reveal class after animation
    setTimeout(() => {
      document.body.classList.remove('first-reveal');
      if (container) {
        container.classList.remove('first-reveal');
      }
    }, 2500);

    // Hide prompts
    const prompt = document.querySelector('.click-prompt') as HTMLElement;
    if (prompt) {
      prompt.style.opacity = '0';
    }

    // Initial celebration
    setTimeout(() => {
      createExplosion();
    }, 100);
  };

  // Resize Canvas
  const resizeCanvas = () => {
    const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  };

  useEffect(() => {
    resizeCanvas();
    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <style jsx global>{`
        :root {
          --color-crimson: #ff4655;
          --color-obsidian: #0f1923;
          --color-vermilion: #7a1515;
          --color-bronze: #8b7355;
          --color-gold: #c5a059;
        }

        .font-shoju { font-family: 'Shojumaru', cursive; }
        .font-orbitron { font-family: 'Orbitron', sans-serif; }
        .font-noto { font-family: 'Noto Serif JP', serif; }

        .stage-container {
          position: relative;
          width: 90%;
          max-width: 480px;
          height: 60vh;
          max-height: 600px;
          perspective: 1200px;
          cursor: pointer;
          padding-top: 20px;
          -webkit-tap-highlight-color: transparent;
          z-index: 20;
        }

        .stage-container.timer-locked {
          cursor: not-allowed;
        }

        .reveal-card {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.5s ease-out;
        }

        .layer-reveal {
          position: absolute;
          inset: 0;
          background-color: var(--color-obsidian);
          z-index: 0;
          overflow: hidden;
          border: 2px solid var(--color-crimson);
          box-shadow: 0 0 50px rgba(0,0,0,0.8);
          display: none;
        }

        .reveal-active .layer-reveal {
          display: block;
        }

        .guest-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.25);
          transition: transform 8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .reveal-active .guest-image {
          transform: scale(1.2);
          animation: slow-zoom 20s infinite alternate ease-in-out, glitch-shake 0.5s ease-out;
        }

        @keyframes glitch-shake {
          0% { transform: scale(1.2) translate(0, 0); filter: hue-rotate(0deg); }
          20% { transform: scale(1.2) translate(-5px, 5px); filter: hue-rotate(90deg); }
          40% { transform: scale(1.2) translate(5px, -5px); filter: hue-rotate(-90deg); }
          60% { transform: scale(1.2) translate(-5px, 0); filter: hue-rotate(0deg); }
          100% { transform: scale(1.2) translate(0, 0); }
        }

        @keyframes slow-zoom {
          0% { transform: scale(1.2); }
          100% { transform: scale(1.35); }
        }

        .info-plate {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background: linear-gradient(to top, rgba(15, 25, 35, 1) 30%, rgba(15, 25, 35, 0));
          padding: 30px 20px 30px;
          color: white;
          transform: translateY(20px);
          opacity: 0;
          transition: all 0.6s ease 0.4s;
          border-top: 1px solid rgba(255, 70, 85, 0.3);
        }

        .reveal-active .info-plate {
          transform: translateY(0);
          opacity: 1;
        }

        .guest-name { font-size: 3rem; }
        .guest-role { font-size: 1.25rem; }

        .agent-intel {
          font-size: 0.8rem;
          color: #888;
          margin-top: 10px;
          border-left: 2px solid var(--color-crimson);
          padding-left: 10px;
          max-width: 80%;
          line-height: 1.4;
          opacity: 0.8;
        }

        .layer-gate {
          position: absolute;
          inset: 0;
          top: -30px;
          z-index: 10;
          display: flex;
          pointer-events: none;
        }

        .gate-panel {
          position: relative;
          width: 50%;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          will-change: transform;
          pointer-events: auto;
        }

        .gate-left { transform-origin: center left; }
        .gate-right { transform-origin: center right; }

        .reveal-active .gate-left {
          transform: translateX(-95%) rotateY(-25deg);
          opacity: 1;
          transition-delay: 0.1s;
        }

        .reveal-active .gate-right {
          transform: translateX(95%) rotateY(25deg);
          opacity: 1;
          transition-delay: 0.1s;
        }

        .gate-bg {
          position: absolute;
          top: 30px;
          bottom: 0;
          width: 100%;
          background: var(--color-obsidian);
          border-bottom: 2px solid var(--color-vermilion);
          overflow: hidden;
          display: flex;
          align-items: center;
          background-image: repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 20px);
        }

        .gate-left .gate-bg { right: 0; border-right: 1px solid #333; }
        .gate-right .gate-bg { left: 0; border-left: 1px solid #333; }

        .torii-hashira {
          position: absolute;
          top: 20px;
          bottom: -10px;
          width: 25px;
          background-color: var(--color-vermilion);
          background-image: linear-gradient(90deg, rgba(0,0,0,0.4), transparent 50%, rgba(0,0,0,0.4));
          box-shadow: 2px 0 10px rgba(0,0,0,0.5);
          z-index: 20;
          border-radius: 4px;
        }

        .gate-left .torii-hashira { left: 5px; }
        .gate-right .torii-hashira { right: 5px; }

        .torii-kasagi {
          position: absolute;
          top: 0;
          height: 30px;
          background-color: var(--color-obsidian);
          border: 2px solid var(--color-vermilion);
          background-image: linear-gradient(to bottom, #333, #0f1923);
          z-index: 30;
          box-shadow: 0 5px 15px rgba(0,0,0,0.6);
        }

        .gate-left .torii-kasagi {
          right: 0;
          width: 120%;
          border-radius: 10px 0 0 0;
          transform: skewX(-15deg);
          transform-origin: bottom right;
        }

        .gate-right .torii-kasagi {
          left: 0;
          width: 120%;
          border-radius: 0 10px 0 0;
          transform: skewX(15deg);
          transform-origin: bottom left;
        }

        .torii-nuki {
          position: absolute;
          top: 35%;
          height: 60px;
          background-color: var(--color-vermilion);
          z-index: 25;
          display: flex;
          align-items: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.4);
          border-top: 2px solid rgba(0,0,0,0.3);
          border-bottom: 2px solid rgba(0,0,0,0.3);
        }

        .gate-left .torii-nuki {
          right: 0;
          width: 100%;
          justify-content: flex-end;
          padding-right: 5px;
          border-right: 1px solid rgba(0,0,0,0.5);
        }

        .gate-right .torii-nuki {
          left: 0;
          width: 100%;
          justify-content: flex-start;
          padding-left: 5px;
          border-left: 1px solid rgba(0,0,0,0.5);
        }

        .nuki-text {
          font-family: 'Shojumaru', cursive;
          font-size: 2.5rem;
          color: var(--color-obsidian);
          text-shadow: 0 1px 0 rgba(255,255,255,0.2);
          line-height: 1;
          margin-top: -5px;
        }

        .torii-tip {
          position: absolute;
          width: 10px;
          height: 34px;
          background: var(--color-gold);
          top: -2px;
          z-index: 31;
          box-shadow: 0 0 10px var(--color-gold);
        }

        .gate-left .torii-tip { left: -15px; transform: skewX(-15deg); }
        .gate-right .torii-tip { right: -15px; transform: skewX(15deg); }

        .shide {
          position: absolute;
          top: 35px;
          width: 20px;
          height: 30px;
          background: #f5f5f5;
          clip-path: polygon(0 0, 100% 0, 50% 100%);
          z-index: 15;
          transform-origin: top center;
          animation: wind 3s ease-in-out infinite;
        }

        .gate-left .shide { right: 40px; }
        .gate-right .shide { left: 40px; animation-delay: 0.5s; }

        @keyframes wind {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }

        .banner-col {
          position: absolute;
          top: 55%;
          color: rgba(255, 255, 255, 0.8);
          font-size: 2rem;
          line-height: 1.2;
          text-shadow: 0 0 10px rgba(200, 42, 42, 0.5);
          background: rgba(0,0,0,0.3);
          padding: 10px 5px;
          border: 1px solid var(--color-vermilion);
          z-index: 21;
        }

        .gate-left .banner-col { right: 20px; }
        .gate-right .banner-col { left: 20px; }

        .hud-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(rgba(255, 70, 85, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 70, 85, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        .click-prompt {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 40;
          text-align: center;
          width: 100%;
          pointer-events: none;
        }

        .click-prompt-text {
          background: var(--color-obsidian);
          border: 1px solid var(--color-vermilion);
          padding: 5px 15px;
          font-family: 'Orbitron', sans-serif;
          color: #f5f5f5;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          box-shadow: 0 0 15px rgba(255, 70, 85, 0.3);
          animation: pulse-text 2s infinite;
        }

        .click-prompt-text.locked {
          color: #888;
          border-color: #444;
          box-shadow: none;
          animation: none;
        }

        @keyframes pulse-text {
          0%, 100% { box-shadow: 0 0 5px rgba(255, 70, 85, 0.3); opacity: 0.8; }
          50% { box-shadow: 0 0 20px rgba(255, 70, 85, 0.6); opacity: 1; }
        }

        .shockwave {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 0;
          height: 0;
          border-radius: 50%;
          border: 5px solid var(--color-crimson);
          opacity: 0;
          z-index: 80;
          pointer-events: none;
        }

        .reveal-active .shockwave {
          animation: shockwave-expand 0.6s cubic-bezier(0, 0.5, 0.5, 1) forwards;
        }

        @keyframes shockwave-expand {
          0% { width: 0; height: 0; opacity: 1; border-width: 50px; }
          100% { width: 150vmax; height: 150vmax; opacity: 0; border-width: 0; }
        }

        .agent-detected-overlay {
          position: fixed;
          inset: 0;
          z-index: 90;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          opacity: 0;
        }

        .reveal-active .agent-detected-overlay {
          animation: none;
        }

        .reveal-active.first-reveal .agent-detected-overlay {
          animation: overlay-sequence 2s forwards;
        }

        @keyframes overlay-sequence {
          0% { opacity: 0; }
          1% { opacity: 1; }
          60% { opacity: 1; }
          100% { opacity: 0; }
        }

        .agent-text-bg {
          background: var(--color-crimson);
          padding: 15px 40px;
          transform: skewX(-20deg) scale(0);
          clip-path: polygon(10% 0, 100% 0, 90% 100%, 0% 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 50px rgba(255, 70, 85, 0.5);
        }

        .reveal-active .agent-text-bg {
          animation: none;
        }

        .reveal-active.first-reveal .agent-text-bg {
          animation: slam-text 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes slam-text {
          0% { transform: skewX(-20deg) scale(3); opacity: 0; }
          100% { transform: skewX(-20deg) scale(1); opacity: 1; }
        }

        .agent-text {
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          font-size: 1.5rem;
          color: white;
          letter-spacing: 0.1em;
          transform: skewX(20deg);
          white-space: nowrap;
        }

        #particle-canvas {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 50;
        }

        .side-deco {
          display: none;
          position: absolute;
          top: 50%;
          transform: translateY(-50%) scale(0.8);
          height: 45vh;
          width: 65px;
          z-index: 15;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .side-deco.left { left: 3%; }
        .side-deco.right { right: 3%; }

        .reveal-active .side-deco {
          opacity: 1;
          transform: translateY(-50%) scale(1);
          transition-delay: 0.3s;
        }

        .neon-sword-container {
          position: relative;
          width: 26px;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .neon-katana {
          fill: none;
          stroke: var(--color-crimson);
          stroke-width: 2;
          filter: drop-shadow(0 0 5px var(--color-crimson)) drop-shadow(0 0 10px var(--color-crimson));
          height: 100%;
          width: 100%;
          overflow: visible;
        }

        .neon-katana path {
          vector-effect: non-scaling-stroke;
        }

        .deco-glow {
          animation: pulse-sword 3s infinite ease-in-out;
        }

        @keyframes pulse-sword {
          0%, 100% { filter: drop-shadow(0 0 5px var(--color-crimson)); stroke-opacity: 0.6; }
          50% { filter: drop-shadow(0 0 15px var(--color-crimson)) drop-shadow(0 0 30px var(--color-vermilion)); stroke-opacity: 1; }
        }

        @media (max-width: 640px) {
          .nuki-text { font-size: 1.8rem; }
          .banner-col { font-size: 1.5rem; padding: 6px 3px; }
          .guest-name { font-size: 2.25rem; }
          .guest-role { font-size: 1rem; }
          .shide { width: 15px; height: 25px; }
          .gate-left .shide { right: 25px; }
          .gate-right .shide { left: 25px; }
          .gate-left .banner-col { right: 10px; }
          .gate-right .banner-col { left: 10px; }
          .agent-text { font-size: 1.2rem; }
        }

        @media (min-width: 1024px) {
          .side-deco { display: flex; }
        }
      `}</style>

      <section className="relative py-8 bg-black flex items-center justify-center overflow-hidden">
        {/* SIDE DECORATIONS (Visible on Laptop/Desktop) - Positioned relative to section */}
        {/* Left Katana */}
        <div className="side-deco left">
          <div className="neon-sword-container">
            <svg className="neon-katana deco-glow" viewBox="0 0 50 400" preserveAspectRatio="none">
              {/* Handle */}
              <rect x="20" y="320" width="10" height="80" fill="#111" stroke="var(--color-crimson)" strokeWidth="2" />
              <defs>
                <pattern id="handle-pattern-left" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="10" y2="10" stroke="#333" strokeWidth="1" />
                  <line x1="10" y1="0" x2="0" y2="10" stroke="#333" strokeWidth="1" />
                </pattern>
              </defs>
              <rect x="20" y="320" width="10" height="80" fill="url(#handle-pattern-left)" fillOpacity="0.5" />
              {/* Tsuba (Guard) */}
              <rect x="10" y="315" width="30" height="5" fill="#111" stroke="var(--color-crimson)" />
              {/* Blade */}
              <path d="M22 315 L22 20 Q 25 0 28 20 L28 315 Z" fill="rgba(255, 70, 85, 0.1)" stroke="var(--color-crimson)" strokeWidth="2" />
              {/* Decorative Kanji inside blade area (abstract) */}
              <path d="M25 50 L25 250" stroke="var(--color-crimson)" strokeWidth="1" strokeDasharray="5,5" opacity="0.5" />
            </svg>
          </div>
        </div>

        {/* Right Katana */}
        <div className="side-deco right">
          <div className="neon-sword-container">
            <svg className="neon-katana deco-glow" viewBox="0 0 50 400" preserveAspectRatio="none">
              {/* Handle */}
              <rect x="20" y="320" width="10" height="80" fill="#111" stroke="var(--color-crimson)" strokeWidth="2" />
              <defs>
                <pattern id="handle-pattern-right" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="10" y2="10" stroke="#333" strokeWidth="1" />
                  <line x1="10" y1="0" x2="0" y2="10" stroke="#333" strokeWidth="1" />
                </pattern>
              </defs>
              <rect x="20" y="320" width="10" height="80" fill="url(#handle-pattern-right)" fillOpacity="0.5" />
              {/* Tsuba (Guard) */}
              <rect x="10" y="315" width="30" height="5" fill="#111" stroke="var(--color-crimson)" />
              {/* Blade */}
              <path d="M22 315 L22 20 Q 25 0 28 20 L28 315 Z" fill="rgba(255, 70, 85, 0.1)" stroke="var(--color-crimson)" strokeWidth="2" />
              {/* Decorative Kanji inside blade area (abstract) */}
              <path d="M25 50 L25 250" stroke="var(--color-crimson)" strokeWidth="1" strokeDasharray="5,5" opacity="0.5" />
            </svg>
          </div>
        </div>

        {/* Valorant FX Layers */}
        <div className="shockwave"></div>
        {showIdentityConfirmed && (
          <div className="agent-detected-overlay">
            <div className="agent-text-bg">
              <span className="agent-text">IDENTITY CONFIRMED</span>
            </div>
          </div>
        )}

        {/* Particle Canvas Layer */}
        <canvas id="particle-canvas"></canvas>

        {/* Container is now the click trigger */}
        <div 
          className={`stage-container ${!isTimerComplete ? 'timer-locked' : ''}`} 
          id="card-container" 
          onClick={handleClick}
        >
          <div className="reveal-card">
            {/* BACK FACE (REVEAL) */}
            <div className="layer-reveal">
              <img 
                src="https://i.dailymail.co.uk/1s/2019/08/16/09/17349002-7360425-Interesting_childhood_Ash_explained_I_always_felt_my_life_was_ve-a-18_1565945120906.jpg" 
                alt="Guest Reveal" 
                className="guest-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzhhZWGMYAEYB8RmROaABADeOQ8CXl/xfgAAAABJRU5ErkJggg==")`
              }}></div>
              
              <div className="info-plate">
                <div className="flex items-center gap-2 text-red-500 mb-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs tracking-widest uppercase font-orbitron">Authorized Access</span>
                </div>
                <h2 className="guest-name text-white font-shoju leading-none mb-2">Ash King</h2>
                <h3 className="guest-role text-gray-300 font-orbitron uppercase tracking-widest">Playback Singer</h3>
              </div>
            </div>

            {/* FRONT FACE (GATE) */}
            <div className="layer-gate">
              {/* Left Door Panel */}
              <div className="gate-panel gate-left">
                <div className="torii-kasagi"></div>
                <div className="torii-tip"></div>
                <div className="shide"></div>
                <div className="gate-bg">
                  <div className="hud-overlay"></div>
                </div>
                <div className="torii-nuki">
                  <span className="nuki-text">PINN</span>
                </div>
                <div className="torii-hashira"></div>
                <div className="banner-col font-noto font-black">
                  <div>頂</div>
                  <div>点</div>
                </div>
              </div>

              {/* Right Door Panel */}
              <div className="gate-panel gate-right">
                <div className="torii-kasagi"></div>
                <div className="torii-tip"></div>
                <div className="shide"></div>
                <div className="gate-bg">
                  <div className="hud-overlay"></div>
                </div>
                <div className="torii-nuki">
                  <span className="nuki-text">ACLE</span>
                </div>
                <div className="torii-hashira"></div>
                <div className="banner-col font-noto font-black">
                  <div>開</div>
                  <div>門</div>
                </div>
              </div>

              {/* Visual Prompt */}
              {!isRevealed && (
                <div className="click-prompt">
                  <span className={`click-prompt-text ${!isTimerComplete ? 'locked' : ''}`}>
                    {isTimerComplete ? '[ TAP TO REVEAL ]' : '[ STAY TUNED... ]'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}