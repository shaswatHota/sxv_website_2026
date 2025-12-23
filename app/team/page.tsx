"use client";

import Image from "next/image";
import Link from "next/link";
import { honourableMentions, studentBodies, TeamMember } from "@/utils/teamData";

// Reusable Team Card Component to keep the page clean
const TeamCard = ({ member }: { member: TeamMember }) => (
  <article className="group relative bg-[#0f0a0a] border border-[#2e0e0e] overflow-hidden p-4 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(112,8,8,0.4)] hover:border-[#700808]">
    {/* Samurai Corner Accents */}
    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#8b5a2b] transition-all group-hover:w-full group-hover:h-full group-hover:border-[#700808] opacity-50"></div>
    
    <div className="relative z-10 text-center">
      {/* Image Container */}
      <div className="relative mx-auto h-64 w-full overflow-hidden grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
        />
        {/* Dark Overlay that fades on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050000] to-transparent opacity-60 group-hover:opacity-20 transition-opacity"></div>
      </div>

      {/* Content */}
      <div className="mt-4 border-t border-[#2e0e0e] pt-4">
        {member.jpTitle && (
          <span className="text-[10px] tracking-[0.3em] text-[#700808] font-bold block mb-1">
            {member.jpTitle}
          </span>
        )}
        <h3 className="text-lg font-semibold text-[#e5e5e5] tracking-wide uppercase">
          {member.name}
        </h3>
        <p className="mt-1 text-xs text-[#a66e4e] tracking-wider uppercase font-medium">
          {member.designation}
        </p>
      </div>
    </div>
  </article>
);

export default function TeamPage() {
  return (
    <section className="min-h-screen bg-[#050000] text-[#cfcfcf] px-6 py-24 relative overflow-hidden selection:bg-[#700808] selection:text-white">
      
      {/* GLOBAL STYLES & FONTS */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Shojumaru&family=Noto+Sans+JP:wght@300;700&display=swap');
        
        .bg-seigaiha {
          background-color: #050000;
          background-image: 
            radial-gradient(circle at 100% 150%, #1a0505 24%, #050000 25%),
            radial-gradient(circle at 0 150%, #1a0505 24%, #050000 25%);
          background-size: 80px 40px;
          opacity: 0.4;
        }
      `}</style>

      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 bg-seigaiha z-0 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-24 flex flex-col items-center">
          <Link href="/committees" className="group">
            <h2 className="text-xs uppercase tracking-[0.5em] text-[#700808] hover:text-[#b30000] transition-colors flex items-center gap-2" style={{ fontFamily: '"Shojumaru", cursive' }}>
              Clubs & Committees <span className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
            </h2>
          </Link>

          <div className="relative mt-8">
             {/* Large background text for depth */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-[6rem] opacity-[0.03] text-[#500000] whitespace-nowrap pointer-events-none select-none uppercase font-black">
                侍チーム
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-center tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#b30000] to-[#500000]" style={{ fontFamily: '"Shojumaru", cursive' }}>
              THE TEAM
            </h1>
          </div>
          
          <div className="w-24 h-[1px] bg-[#2e0e0e] mt-4 mb-4"></div>
          <p className="text-[#6b4c4c] uppercase tracking-[0.3em] text-sm font-bold italic">Hon&apos;ble Mentions</p>
        </div>

        {/* HONOURABLE MENTIONS GRID */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {honourableMentions.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>

        {/* STUDENT BODIES SECTION */}
        <div className="mt-40 mb-16 flex flex-col items-center">
          <div className="h-[2px] w-12 bg-[#700808] mb-6"></div>
          <h1 className="text-4xl font-bold tracking-[0.2em] text-[#e5e5e5] uppercase" style={{ fontFamily: '"Shojumaru", cursive' }}>
            Student Bodies
          </h1>
          <p className="text-[#a66e4e] text-[10px] tracking-[0.4em] mt-2 uppercase">The Execution Unit</p>
        </div>
         
        <div className="grid gap-8 sm:grid-cols-2 max-w-3xl mx-auto">
          {studentBodies.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>

        {/* FOOTER ACCENT */}
        <div className="mt-32 flex justify-center opacity-20">
             <div className="text-[#700808] text-4xl" style={{ fontFamily: '"Shojumaru", cursive' }}>祭</div>
        </div>

      </div>
    </section>
  );
}