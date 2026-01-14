"use client";

import Image from "next/image";
import Link from "next/link";
import { honourableMentions, studentBodies, TeamMember } from "@/utils/teamData";

/* ===================== TEAM CARD ===================== */
const TeamCard = ({ member }: { member: TeamMember }) => (
  <article className="group relative bg-[#0f0a0a] border border-[#2e0e0e] overflow-hidden p-4 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(112,8,8,0.4)] hover:border-[#700808]">
    
    {/* Samurai Corner Accent */}
    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#8b5a2b] transition-all group-hover:w-full group-hover:h-full group-hover:border-[#700808] opacity-50"></div>
    
    <div className="relative z-10 text-center">
      
      {/* Image */}
      <div className="relative mx-auto h-64 w-full overflow-hidden grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-top md:object-center md:object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050000] to-transparent opacity-60 group-hover:opacity-20 transition-opacity"></div>
      </div>

      {/* Content */}
      <div className="mt-4 border-t border-[#2e0e0e] pt-4">
        
        {member.jpTitle && (
          <span className="text-[10px] tracking-[0.3em] text-[#700808] font-bold block mb-1">
            {member.jpTitle}
          </span>
        )}

        {/* NAME (PLAIN TEXT) */}
        <h3 className="text-lg font-semibold text-[#e5e5e5] tracking-wide uppercase">
          {member.name}
        </h3>

        {/* DESIGNATION */}
        <p className="mt-1 text-xs text-[#a66e4e] tracking-wider uppercase font-medium">
          {member.designation}
        </p>

        {/* ICONS */}
        {(member.linkedin || member.email) && (
          <div className="mt-3 flex justify-center gap-4">
            
            {/* LinkedIn */}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-[#2e0e0e] rounded-md
                           text-[#6b4c4c] hover:text-[#0a66c2]
                           hover:border-[#0a66c2]
                           hover:shadow-[0_0_12px_rgba(10,102,194,0.4)]
                           transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.98 3.5C4.98 5 3.9 6 2.5 6S0 5 0 3.5 1.08 1 2.5 1s2.48 1 2.48 2.5zM.2 24h4.6V7.9H.2V24zM8.2 7.9H12.6v2.2h.1c.6-1.1 2-2.2 4.1-2.2 4.4 0 5.2 2.9 5.2 6.6V24h-4.6v-7.6c0-1.8 0-4.2-2.6-4.2s-3 2-3 4v7.8H8.2V7.9z"/>
                </svg>
              </a>
            )}

            {/* Email */}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="p-2 border border-[#2e0e0e] rounded-md
                           text-[#6b4c4c] hover:text-[#700808]
                           hover:border-[#700808]
                           hover:shadow-[0_0_12px_rgba(112,8,8,0.4)]
                           transition-all duration-300"
                aria-label="Email"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  </article>
);

/* ===================== PAGE ===================== */
export default function TeamPage() {
  return (
    <section className="min-h-screen bg-[#050000] text-[#cfcfcf] px-6 py-24 relative overflow-hidden selection:bg-[#700808] selection:text-white">
      
      {/* GLOBAL STYLES */}
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

      {/* BACKGROUND */}
      <div className="fixed inset-0 bg-seigaiha z-0 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-24 flex flex-col items-center">
          <Link href="/committees" className="group">
            <h2
              className="text-xs uppercase tracking-[0.5em] text-[#700808] hover:text-[#b30000] transition-colors flex items-center gap-2"
              style={{ fontFamily: '"Shojumaru", cursive' }}
            >
              Clubs & Committees
              <span className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
            </h2>
          </Link>

          <div className="relative mt-8">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-[6rem] opacity-[0.03] text-[#500000] pointer-events-none uppercase font-black">
              侍チーム
            </div>
            <h1
              className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#b30000] to-[#500000]"
              style={{ fontFamily: '"Shojumaru", cursive' }}
            >
              THE TEAM
            </h1>
          </div>

          <div className="w-24 h-[1px] bg-[#2e0e0e] mt-4 mb-4"></div>
          <p className="text-[#6b4c4c] uppercase tracking-[0.3em] text-sm font-bold italic">
            Hon&apos;ble Mentions
          </p>
        </div>

        {/* HONOURABLE MENTIONS */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {honourableMentions.map(member => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>

        {/* STUDENT BODIES */}
        <div className="mt-40 mb-16 flex flex-col items-center">
          <div className="h-[2px] w-12 bg-[#700808] mb-6"></div>
          <h1
            className="text-4xl font-bold tracking-[0.2em] uppercase"
            style={{ fontFamily: '"Shojumaru", cursive' }}
          >
            Student Bodies
          </h1>
          <p className="text-[#a66e4e] text-[10px] tracking-[0.4em] mt-2 uppercase">
            The Execution Unit
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 max-w-3xl mx-auto">
          {studentBodies.map(member => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>

        {/* FOOTER */}
        <div className="mt-32 flex justify-center opacity-20">
          <div className="text-[#700808] text-4xl" style={{ fontFamily: '"Shojumaru", cursive' }}>
            祭
          </div>
        </div>

      </div>
    </section>
  );
}
