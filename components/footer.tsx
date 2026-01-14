
'use client';

import Link from "next/link";
import { useState } from "react";

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email subscription logic here
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <footer className={`relative bg-[var(--cyber-dark)] border-t-2 border-[var(--blood-red)] z-0 mt-auto ${className}`}>
      {/* Top Decor Strip */}
      <div className="absolute -top-[14px] left-0 w-full h-4 flex justify-between items-center px-4 md:px-12 pointer-events-none">
        <div className="w-32 h-[2px] bg-[var(--shrine-red)]"></div>
        <div className="bg-[var(--cyber-black)] border border-[var(--shrine-red)] px-4 py-1 text-[10px] text-[var(--shrine-red)] font-['Orbitron'] tracking-widest uppercase transform -skew-x-12">
          System_Ready
        </div>
        <div className="w-full h-[1px] bg-gray-900 mx-4 relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[var(--shrine-red)] rotate-45"></div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[1600px] mx-auto pt-16 pb-8 px-6 lg:px-12 relative z-10">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* COL 1: Brand & Identity (4 Spans) */}
          <div className="lg:col-span-4 flex flex-col gap-6 relative group">
            {/* Decor Background Kanji */}
            <div className="absolute -left-10 -top-10 text-9xl text-[var(--shrine-red)] opacity-[0.05] font-['Shojumaru'] pointer-events-none select-none">
              未来
            </div>
            
            {/* Replace text with neon logo image */}
            <div className="glitch-wrapper inline-block w-fit z-0">
              <img 
                src="/samavesh-vassaunt-neon-logo.PNG"  
                className="max-w-full h-auto max-h-41 object-contain"
              />
            </div>
            
            <p className="text-gray-500 leading-relaxed font-['Shojumaru'] text-lg max-w-sm border-l-2 border-[var(--blood-red)] pl-4">
              Bridging the gap between tradition and the digital frontier. Join the network of creators, gamers, and innovators.
            </p>
            
            {/* Status Indicators */}
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--paper-white)] rounded-full animate-pulse shadow-[0_0_10px_var(--paper-white)]"></span>
                <span className="text-xs font-['Shojumaru'] text-[var(--paper-white)] tracking-widest">SERVER: ONLINE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--shrine-red)] rounded-full shadow-[0_0_10px_var(--shrine-red)]"></span>
                <span className="text-xs font-['Shojumaru'] text-[var(--shrine-red)] tracking-widest">SECURE</span>
              </div>
            </div>
          </div>

          {/* DIVIDER 1 (Desktop Only) */}
          <div className="hidden lg:flex justify-center items-center col-span-1 relative">
            <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-[var(--blood-red)] to-transparent relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--cyber-dark)] p-2 border border-[var(--blood-red)] rotate-45">
                <span className="block -rotate-45 text-[var(--rust-brown)] font-['Shojumaru'] text-xs">壱</span>
              </div>
            </div>
          </div>

          {/* COL 2: Navigation Links (3 Spans) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h3 className="text-[var(--shrine-red)] font-['Shojumaru'] tracking-[0.2em] text-sm uppercase flex items-center gap-2">
              <i className="fa-solid fa-torii-gate"></i> Directory
            </h3>
            
            <ul className="space-y-3 font-['Shojumaru'] text-lg">
              <li className="group">
                <Link href="/" className="flex items-center text-gray-500 hover:text-white transition-colors">
                  <span className="w-0 group-hover:w-4 h-[1px] bg-[var(--shrine-red)] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  <span className="font-['Shojumaru'] text-sm text-[var(--rust-brown)] mr-2 group-hover:text-[var(--shrine-red)] transition-colors">家</span>
                  Home
                </Link>
              </li>
              <li className="group">
                <Link href="/events" className="flex items-center text-gray-500 hover:text-white transition-colors">
                  <span className="w-0 group-hover:w-4 h-[1px] bg-[var(--shrine-red)] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  <span className="font-['Shojumaru'] text-sm text-[var(--rust-brown)] mr-2 group-hover:text-[var(--shrine-red)] transition-colors">予定</span>
                  Events
                </Link>
              </li>
              <li className="group">
                <Link href="/committees" className="flex items-center text-gray-500 hover:text-white transition-colors">
                  <span className="w-0 group-hover:w-4 h-[1px] bg-[var(--shrine-red)] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  <span className="font-['Shojumaru'] text-sm text-[var(--rust-brown)] mr-2 group-hover:text-[var(--shrine-red)] transition-colors">部門</span>
                  Committees
                </Link>
              </li>
              <li className="group">
                <Link href="/team" className="flex items-center text-gray-500 hover:text-white transition-colors">
                  <span className="w-0 group-hover:w-4 h-[1px] bg-[var(--shrine-red)] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  <span className="font-['Shojumaru'] text-sm text-[var(--rust-brown)] mr-2 group-hover:text-[var(--shrine-red)] transition-colors">チーム</span>
                  Team
                </Link>
              </li>
              <li className="group">
                <Link href="/contactUs" className="flex items-center text-gray-500 hover:text-white transition-colors">
                  <span className="w-0 group-hover:w-4 h-[1px] bg-[var(--shrine-red)] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  <span className="font-['Shojumaru'] text-sm text-[var(--rust-brown)] mr-2 group-hover:text-[var(--shrine-red)] transition-colors">連絡</span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* DIVIDER 2 (Desktop Only) */}
          <div className="hidden lg:flex justify-center items-center col-span-1 relative">
            <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-[var(--blood-red)] to-transparent relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--cyber-dark)] p-2 border border-[var(--blood-red)] rotate-45">
                <span className="block -rotate-45 text-[var(--rust-brown)] font-['Shojumaru'] text-xs">壱</span>
              </div>
            </div>
          </div>

          {/* COL 3: Social & Subscribe (3 Spans) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h3 className="text-[var(--rust-brown)] font-['Shojumaru'] tracking-[0.2em] text-sm uppercase flex items-center gap-2">
              <i className="fa-solid fa-satellite-dish"></i> Uplink
            </h3>
            
            {/* Social Icons - Updated with specific links */}
            <div className="flex gap-4">
              {/* 1st Instagram - Samavesh */}
              <a 
                href="https://www.instagram.com/samavesh.vssut/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-black border border-gray-800 flex items-center justify-center text-gray-500 hover:border-[var(--shrine-red)] hover:text-[var(--shrine-red)] hover:shadow-[0_0_15px_rgba(166,24,24,0.5)] transition-all cyber-clip-tl"
                title="Samavesh Instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              
              {/* 2nd Email */}
              <a 
                href="mailto:techsociety@vssut.ac.in" 
                className="w-10 h-10 bg-black border border-gray-800 flex items-center justify-center text-gray-500 hover:border-[var(--paper-white)] hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all cyber-clip-tl"
                title="Email: techsociety@vssut.ac.in"
              >
                <i className="fa-solid fa-envelope"></i>
              </a>
              
              {/* 3rd Instagram - Vassaunt */}
              <a 
                href="https://www.instagram.com/vassaunt_vssut?igsh=MTh4bnhkM21xdm5sag==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-black border border-gray-800 flex items-center justify-center text-gray-500 hover:border-[var(--rust-brown)] hover:text-[var(--rust-brown)] hover:shadow-[0_0_15px_rgba(140,106,93,0.5)] transition-all cyber-clip-tl"
                title="Vassaunt Instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>

          </div>
        </div>

        {/* Japanese Vertical Decor (Absolute Left/Right) */}
        <div className="absolute top-1/2 -translate-y-1/2 left-2 hidden 2xl:block opacity-40">
          <div className="vertical-text text-[var(--shrine-red)] text-xs font-['Shojumaru'] tracking-[0.5em] drop-shadow-[0_0_5px_rgba(166,24,24,0.8)]">
            東京暗黒街
          </div>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-2 hidden 2xl:block opacity-40">
          <div className="vertical-text text-gray-700 text-xs font-['Shojumaru'] tracking-[0.5em]">
            神社接続
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-6 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-['Shojumaru'] text-gray-600">
          <div className="flex items-center gap-4">
            <span className="text-[var(--shrine-red)]">© 2026 SAMAVESHxVASSAUNT</span>
            <span className="hidden md:inline text-gray-800">|</span>
          </div>
          
          {/* Replace decorative lines with Enigma logo */}
          <div className="flex items-center gap-3">
            <img 
              src="/enigma-logo.png" 
              alt="Enigma Logo" 
              className="w-15 h-20 object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-gray-500">MADE WITH</span>
            <span className="text-red-500">❤</span>
            <span className="text-gray-500">BY</span>
            <span className="text-white font-['Shojumaru']">ENIGMA VSSUT</span>
          </div>
        </div>
      </div>

      {/* Background Decor Assets */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--shrine-red)] opacity-[0.05] rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-[0.02] rounded-full blur-[100px] pointer-events-none"></div>
      <div className="scanlines"></div>

      {/* Torii Gate Silhouette (Subtle) */}
      <svg 
        className="absolute bottom-0 right-10 w-32 h-auto opacity-[0.08] pointer-events-none" 
        viewBox="0 0 100 100" 
        fill="var(--shrine-red)"
      >
        <path d="M10,20 H90 V25 H80 V80 H85 V85 H75 V25 H25 V85 H15 V80 H20 V25 H10 Z M5,10 H95 V15 H5 Z" />
      </svg>
    </footer>
  );
}
