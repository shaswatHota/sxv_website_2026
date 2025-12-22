"use client";

import ChromaGrid from "@/components/ChromaGrid";
import { honourableMentions, studentBodies } from "@/utils/teamData";

// Convert team data to ChromaGrid format
const honourableMentionsData = honourableMentions.map(member => ({
  image: member.image,
  title: member.name,
  subtitle: member.designation,
  handle: member.handle,
  borderColor: member.borderColor,
  gradient: member.gradient,
  url: member.url
}));

const studentBodiesData = studentBodies.map(member => ({
  image: member.image,
  title: member.name,
  subtitle: member.designation,
  handle: member.handle,
  borderColor: member.borderColor,
  gradient: member.gradient,
  url: member.url
}));

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header Section */}
      <div className="relative pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <a href="/committees" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
              <span className="text-sm uppercase tracking-widest">CLUBS & COMMITTEES</span>
              <span className="text-lg">↗</span>
            </a>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            THE TEAM
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
        </div>
      </div>

      {/* Honourable Mentions Section */}
      <div className="px-6 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Hon'ble Mentions
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Distinguished faculty members leading our institution with vision and excellence
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px]">
              {honourableMentionsData.map((member, index) => (
                <div key={index} className="flex justify-center">
                  <ChromaGrid 
                    items={[member]}
                    radius={200}
                    damping={0.45}
                    fadeOut={0.6}
                    ease="power3.out"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Student Bodies Section */}
      <div className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Student Bodies
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Dedicated student leaders driving innovation and fostering community spirit
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px]">
              {studentBodiesData.map((member, index) => (
                <div key={index} className="flex justify-center">
                  <ChromaGrid 
                    items={[member]}
                    radius={200}
                    damping={0.5}
                    fadeOut={0.7}
                    ease="power2.out"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
    </div>
  );
}
