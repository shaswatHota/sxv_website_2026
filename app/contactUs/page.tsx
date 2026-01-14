'use client';

import React, { useState, useEffect } from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import {ContactUsButton} from '@/components/ui/contactUsButton';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Zod validation schema
const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string()
    .email({ message: 'Please enter a valid email address' }),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must be less than 500 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// Custom SVG Lantern Component to match traditional festival style
// Designed to look like a 'Chochin' (red paper lantern)
const FestivalLantern = ({ delay = 0, text = "祭", swingDuration = 3 }: { delay?: number; text?: string; swingDuration?: number }) => {
  return (
    <div 
      className="relative flex flex-col items-center origin-top z-20"
      style={{
        animation: `swing ${swingDuration}s ease-in-out infinite alternate`,
        animationDelay: `${delay}s`
      }}
    >
      {/* The Rope/Hanger */}
      <div className="h-24 w-1 bg-neutral-800 relative">
        {/* Knot */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full border border-red-900"></div>
      </div>

      {/* Top Cap */}
      <div className="w-24 h-5 bg-black rounded-t-lg shadow-sm border-t border-neutral-700 relative z-10">
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-2 bg-neutral-800 rounded-full"></div>
      </div>

      {/* Lantern Body */}
      <div className="relative w-32 h-40 bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-xl shadow-[0_0_50px_rgba(220,38,38,0.4)] flex items-center justify-center overflow-hidden border-x border-red-950">
        {/* Inner Glow Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-orange-500/10 to-transparent"></div>
        
        {/* Ribs (Horizontal Lines) */}
        <div className="absolute inset-0 flex flex-col justify-between py-2 opacity-40 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full h-[1px] bg-black shadow-[0_1px_0_rgba(255,255,255,0.1)]"></div>
          ))}
        </div>

        {/* Vertical Character Box */}
        <div className="relative z-10 w-16 h-24 bg-red-50/10 border border-red-900/30 flex items-center justify-center backdrop-blur-[1px]">
          <span 
            className="text-4xl font-serif text-black font-bold drop-shadow-md opacity-90 font-japanese-serif" 
            style={{ writingMode: 'vertical-rl' }}
          >
            {text}
          </span>
        </div>
      </div>

      {/* Bottom Cap */}
      <div className="w-24 h-5 bg-black rounded-b-lg shadow-sm border-b border-neutral-700 relative z-10">
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-2 bg-neutral-800 rounded-full"></div>
      </div>

      {/* Tassels */}
      <div className="flex justify-center -mt-1 space-x-2">
        <div className="w-1 h-16 bg-red-900 shadow-sm"></div>
        <div className="w-1 h-20 bg-red-900 shadow-sm"></div>
        <div className="w-1 h-16 bg-red-900 shadow-sm"></div>
      </div>

      {/* Dynamic Glow Effect below */}
      <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-40 h-40 bg-orange-600/20 blur-[60px] rounded-full pointer-events-none"></div>
    </div>
  );
};

export default function Page() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  // Background pattern effect
  useEffect(() => {
    // Add font via link if not present (simulated via style tag below for single file constraint)
  }, []);

  const onSubmit = async (data: ContactFormData) => {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed");

    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 3000);
  } catch (err) {
    alert("Message could not be sent. Please try again.");
  }
};


  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans relative overflow-hidden selection:bg-red-900 selection:text-white">
      {/* Styles for traditional vibe */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700;900&display=swap');
        .font-japanese-serif { font-family: 'Noto Serif JP', serif; }
        @keyframes swing {
          0% { transform: rotate(-3deg); }
          100% { transform: rotate(3deg); }
        }
        .bg-seigaiha {
          background-color: #0a0a0a;
          background-image: 
            radial-gradient(circle at 100% 150%, #1a1a1a 24%, #0a0a0a 25%, #0a0a0a 28%, #1a1a1a 29%, #1a1a1a 36%, #0a0a0a 36%, #0a0a0a 40%, transparent 40%, transparent),
            radial-gradient(circle at 0    150%, #1a1a1a 24%, #0a0a0a 25%, #0a0a0a 28%, #1a1a1a 29%, #1a1a1a 36%, #0a0a0a 36%, #0a0a0a 40%, transparent 40%, transparent),
            radial-gradient(circle at 50%  100%, #1a1a1a 10%, #0a0a0a 11%, #0a0a0a 23%, #1a1a1a 24%, #1a1a1a 30%, #0a0a0a 31%, #0a0a0a 43%, #1a1a1a 44%, #1a1a1a 50%, #0a0a0a 51%, #0a0a0a 63%, #1a1a1a 64%, #1a1a1a 71%, transparent 71%, transparent),
            radial-gradient(circle at 100% 50%, #1a1a1a 5%, #0a0a0a 6%, #0a0a0a 15%, #1a1a1a 16%, #1a1a1a 20%, #0a0a0a 21%, #0a0a0a 30%, #1a1a1a 31%, #1a1a1a 35%, #0a0a0a 36%, #0a0a0a 45%, #1a1a1a 46%, #1a1a1a 49%, transparent 50%, transparent),
            radial-gradient(circle at 0    50%, #1a1a1a 5%, #0a0a0a 6%, #0a0a0a 15%, #1a1a1a 16%, #1a1a1a 20%, #0a0a0a 21%, #0a0a0a 30%, #1a1a1a 31%, #1a1a1a 35%, #0a0a0a 36%, #0a0a0a 45%, #1a1a1a 46%, #1a1a1a 49%, transparent 50%, transparent);
          background-size: 100px 50px;
          opacity: 0.4;
        }
        .brush-border {
          mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,50 Q50,45 100,50 T200,50' stroke='black' stroke-width='10' fill='none'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* Background Texture Layer */}
      <div className="fixed inset-0 bg-seigaiha pointer-events-none z-0"></div>

      {/* Ambient Red Glow at bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-red-950/30 to-transparent pointer-events-none z-0"></div>

      {/* Top Rope Line for Lanterns */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-800 shadow-md z-10"></div>

      {/* Lantern Columns */}
      <div className="absolute top-0 left-4 md:left-12 h-screen flex flex-col items-center gap-12 z-20 hidden sm:flex pointer-events-none">
        <FestivalLantern text="御" delay={0.2} swingDuration={3.5} />
        <FestivalLantern text="縁" delay={1.2} swingDuration={4.2} />
      </div>

      <div className="absolute top-0 right-4 md:right-12 h-screen flex flex-col items-center gap-12 z-20 hidden sm:flex pointer-events-none">
        <FestivalLantern text="歓" delay={0.7} swingDuration={4.0} />
        <FestivalLantern text="迎" delay={1.5} swingDuration={3.2} />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex items-center justify-center py-20 px-4 sm:px-6 md:px-24">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-5 gap-0 bg-neutral-900/80 backdrop-blur-sm shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-neutral-800 rounded-sm mx-auto">
          
          {/* Left Panel: Info (Black & Gold Theme) */}
          <div className="md:col-span-2 bg-black border-r-0 md:border-r border-neutral-800 p-6 sm:p-8 md:p-10 flex flex-col justify-between relative group">
            {/* Decorative Red Circle */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-red-700 rounded-full blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
            
            <div>
              <h2 className="text-3xl sm:text-4xl font-japanese-serif font-bold text-white mb-2 tracking-widest">
                <span className="text-red-600 block text-lg mb-2 tracking-[0.3em] uppercase opacity-80 font-sans">Contact</span>
                お問い合わせ
              </h2>
              <div className="h-1 w-20 bg-red-700 mb-8 sm:mb-10"></div>
              
              <p className="text-neutral-400 mb-8 sm:mb-12 font-japanese-serif leading-loose text-sm">
                We bridge tradition and modernity. Reach out to us for collaborations, inquiries, or just to say hello under the lanterns light.
              </p>

              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-center space-x-4 text-neutral-300 group/item hover:text-red-500 transition-colors cursor-pointer">
                  <div className="w-10 h-10 border border-neutral-700 bg-neutral-900 flex items-center justify-center rounded-sm group-hover/item:border-red-700 transition-colors">
                    <MapPin size={18} />
                  </div>
                  <span className="text-sm tracking-wide">
                    Veer Surendra Sai University of Technology<br/>
                    <span className="text-xs text-neutral-500">Burla, Sambalpur, Odisha</span>
                  </span>
                </div>

                <div className="flex items-center space-x-4 text-neutral-300 group/item hover:text-red-500 transition-colors cursor-pointer">
                  <div className="w-10 h-10 border border-neutral-700 bg-neutral-900 flex items-center justify-center rounded-sm group-hover/item:border-red-700 transition-colors">
                    <Phone size={18} />
                  </div>
                  <span className="text-sm tracking-wide">
                    +91 9861-405-554<br/>
                    <span className="text-xs text-neutral-500">Mon-Fri, 9am - 6pm</span>
                  </span>
                </div>

                <div className="flex items-center space-x-4 text-neutral-300 group/item hover:text-red-500 transition-colors cursor-pointer">
                  <div className="w-10 h-10 border border-neutral-700 bg-neutral-900 flex items-center justify-center rounded-sm group-hover/item:border-red-700 transition-colors">
                    <Mail size={18} />
                  </div>
                  <span className="text-sm tracking-wide">
                    techsociety@vssut.ac.in<br/>
                    <span className="text-xs text-neutral-500">Reply within 24h</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Kanji Watermark */}
            <div className="absolute bottom-[-20px] right-[-20px] text-[120px] sm:text-[150px] font-japanese-serif text-neutral-800 opacity-20 pointer-events-none select-none">
              和
            </div>
          </div>

          {/* Right Panel: Form (Red Accents) */}
          <div className="md:col-span-3 p-6 sm:p-8 md:p-10 lg:p-14 bg-neutral-900 relative">
            <h3 className="text-xl sm:text-2xl font-japanese-serif text-white mb-6 sm:mb-8 flex items-center">
              <span className="w-2 h-6 sm:h-8 bg-red-600 mr-4"></span>
              Send Message
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
              <div className="group relative">
                <Input
                  type="text"
                  {...register('name')}
                  className="w-full bg-transparent border-0 border-b border-neutral-700 rounded-none py-3 text-neutral-200 focus-visible:ring-0 focus-visible:border-red-600 transition-colors peer placeholder-transparent"
                  placeholder="Name"
                  id="name"
                />
                <Label 
                  htmlFor="name" 
                  className="absolute left-0 top-3 text-neutral-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-red-500 peer-focus:text-xs peer-valid:-top-4 peer-valid:text-xs"
                >
                  Your Name
                </Label>
                {errors.name && (
                  <span className="text-xs text-red-400 mt-1 block">{errors.name.message}</span>
                )}
              </div>

              <div className="group relative">
                <Input
                  type="email"
                  {...register('email')}
                  className="w-full bg-transparent border-0 border-b border-neutral-700 rounded-none py-3 text-neutral-200 focus-visible:ring-0 focus-visible:border-red-600 transition-colors peer placeholder-transparent"
                  placeholder="Email"
                  id="email"
                />
                <Label 
                  htmlFor="email" 
                  className="absolute left-0 top-3 text-neutral-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-red-500 peer-focus:text-xs peer-valid:-top-4 peer-valid:text-xs"
                >
                  Email Address
                </Label>
                {errors.email && (
                  <span className="text-xs text-red-400 mt-1 block">{errors.email.message}</span>
                )}
              </div>

              <div className="group relative">
                <Textarea
                  {...register('message')}
                  rows={4}
                  className="w-full bg-transparent border-0 border-b border-neutral-700 rounded-none py-3 text-neutral-200 focus-visible:ring-0 focus-visible:border-red-600 transition-colors peer placeholder-transparent resize-none"
                  placeholder="Message"
                  id="message"
                />
                <Label 
                  htmlFor="message" 
                  className="absolute left-0 top-3 text-neutral-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-red-500 peer-focus:text-xs peer-valid:-top-4 peer-valid:text-xs"
                >
                  Your Message
                </Label>
                {errors.message && (
                  <span className="text-xs text-red-400 mt-1 block">{errors.message.message}</span>
                )}
              </div>

              <div className="pt-4">
                <ContactUsButton
                  type="submit"
                  disabled={isSubmitting}
                  className={`group relative overflow-hidden w-full px-6 sm:px-10 py-3 sm:py-4 bg-white text-black font-bold tracking-widest transition-all duration-500 hover:bg-red-700 hover:text-white border-0 rounded-none disabled:opacity-50 ${
                    isSubmitted ? 'bg-red-700 text-white' : ''
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 text-sm sm:text-base">
                    {isSubmitting ? 'SUBMITTING...' : isSubmitted ? 'SUBMITTED' : 'SEND MESSAGE'}
                    {!isSubmitting && !isSubmitted && <Send size={16} className="group-hover:translate-x-1 transition-transform" />}
                  </span>
                </ContactUsButton>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Decorative vertical lines typically found in japanese architecture */}
      <div className="fixed inset-y-0 left-8 md:left-24 w-[1px] bg-red-900/20 pointer-events-none"></div>
      <div className="fixed inset-y-0 right-8 md:right-24 w-[1px] bg-red-900/20 pointer-events-none"></div>
    </div>
  );
}