"use client";

import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Calendar, ChevronDown, Zap, Theater, Gamepad2, Sparkles, X, Loader2, Check } from 'lucide-react';
import { EventItems } from "@/types/Event";
import { eventService } from "@/services/eventService";
import { transformBackendEventToFrontend, getUniqueCategories, getUniqueDays } from "@/utils/eventTransformer";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/utils/api';

type ScrollOption = { id: string; label?: string; icon?: React.ComponentType<any> };
type StyledEvent = EventItems & { image: string; japaneseTitle: string; orgId: string };

const CATEGORY_ICONS: Record<string, any> = {
  Technical: Zap,
  Cultural: Theater,
  "E-Sports": Gamepad2,
  Fun: Sparkles,
};

const GlitchHeader = () => {
  const [text, setText] = useState("EVENTS");
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => {
        setText(prev => prev === "EVENTS" ? "行事" : "EVENTS");
      }, 150);
      setTimeout(() => setGlitching(false), 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative text-center mb-8 mt-6 z-10">
      <h1 className={`text-5xl md:text-7xl font-cinzel font-bold tracking-widest transition-colors duration-100 ${glitching ? 'text-[#b30000] translate-x-1' : 'text-[#b30000]'}`}>
        {text}
      </h1>
      <div className="h-0.5 w-16 bg-[#d4af37] mx-auto mt-3 shadow-[0_0_15px_rgba(212,175,55,0.6)]"></div>
      <p className="mt-2 text-[#d4af37] tracking-[0.5em] text-xs uppercase font-cinzel opacity-80">Samavesh X Vassaunt</p>
    </div>
  );
};

const ScrollSelector = ({
  options,
  selected,
  onSelect,
}: {
  options: Array<ScrollOption | string>;
  selected: string;
  onSelect: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full md:w-56 z-40 mx-auto">
      {/* Scroll Head - Crimson Red with gold-ish accent text */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer relative h-12 bg-gradient-to-b from-[#600000] via-[#3a0000] to-[#600000] border-y border-[#d4af37]/60 flex items-center justify-between px-4 shadow-lg rounded-sm group hover:brightness-125 transition-all"
      >
        <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-14 bg-gradient-to-r from-[#d4af37] to-[#8a6d1f] rounded-l-sm shadow-md border-r border-black/50"></div>
        <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-14 bg-gradient-to-l from-[#d4af37] to-[#8a6d1f] rounded-r-sm shadow-md border-l border-black/50"></div>
        
        <span className="text-[#ffdbdb] font-cinzel font-bold text-sm tracking-wide group-hover:text-white transition-colors truncate w-full text-center uppercase">
             {selected}
        </span>
        
        <ChevronDown size={14} className={`text-[#d4af37] absolute right-3 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Unrolling Paper Body */}
      <div 
        className={`absolute top-11 left-2 right-2 overflow-hidden transition-all duration-500 ease-out shadow-[0_10px_40px_rgba(0,0,0,0.8)] origin-top z-10 ${isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ 
            backgroundColor: '#f0e6d2', 
            backgroundImage: `url("https://www.transparenttextures.com/patterns/rice-paper.png")`,
        }}
      >
        <div className="py-2 flex flex-col relative">
          {options.map((opt) => {
            const optionId = typeof opt === "string" ? opt : opt.id;
            const optionLabel = typeof opt === "string" ? opt : opt.label || opt.id;
            const Icon = typeof opt === "string" ? null : opt.icon;
            return (
            <button
              key={optionId}
              onClick={() => {
                onSelect(optionId);
                setIsOpen(false);
              }}
              className={`text-left px-4 py-3 font-cinzel font-bold text-xs transition-all flex items-center justify-between border-b border-[#d4af37]/20 ${
                (selected === optionId) 
                  ? 'bg-red-900/10 text-red-900' 
                  : 'text-[#4a0000] hover:bg-[#e6dcc5] hover:tracking-wider'
              }`}
            >
                <div className="flex items-center gap-2">
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    <span>{optionLabel}</span>
                </div>
                {(selected === optionId) && <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>}
            </button>
          )})}
        </div>
        <div className="h-3 w-full bg-[#f0e6d2]" style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 85% 60%, 75% 100%, 65% 60%, 55% 100%, 45% 60%, 35% 100%, 25% 60%, 15% 100%, 5% 60%, 0 100%)' }}></div>
      </div>
    </div>
  );
};

const EventCard = ({ event, isRegistered }: { event: StyledEvent, isRegistered: boolean }) => {
const [flipped, setFlipped] = useState(false);

const [isRegistering, setIsRegistering] = useState(false)
const router = useRouter()
const { user, isLoggedIn } = useAuth() 

const handleRegister = async (e: React.MouseEvent) => {
  e.stopPropagation()

  // 1. Check Login via Context
  if (!isLoggedIn || !user) {
    router.push('/login')
    return
  }

  setIsRegistering(true)

  try {
    const response = await api.post('/api/events/register', {
      userId: user.id,
      eventId: event.id,
      orgId: event.orgId,
      eventName: event.title,
    })

    if (response.status === 200 || response.status === 201) {

      if (event.registrationLink) {
        window.open(event.registrationLink, '_blank')
      }
    }
  } catch (error: any) {
    console.error('Registration error:', error)
    const message =
      error.response?.data?.message || 'Something went wrong. Please try again.'
    alert(message)
  } finally {
    setIsRegistering(false)
  }
}
  return (
    <div
      className="group w-full h-[320px] md:h-[360px] perspective-1000 cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-all duration-700 transform-style-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="absolute w-full h-full backface-hidden bg-[#0a0a0a] border border-[#d4af37]/30 group-hover:border-[#d4af37] transition-colors overflow-hidden rounded-sm shadow-lg">
          <div className="absolute inset-0">
            {isRegistered && (
              <div className="absolute top-4 right-4 z-20">
                {/* Used Solid Gold background to match the 'FUN' tag border but distinct as a 'Stamp' */}
                <div className="flex items-center gap-1.5 bg-[#d4af37] border border-[#d4af37] px-2.5 py-1 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                  <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                  <span className="text-[10px] font-mono font-extrabold text-black tracking-widest uppercase">
                    REGISTERED
                  </span>
                </div>
              </div>
            )}
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover opacity-60 grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
          </div>
          <div className="absolute bottom-0 left-0 p-5 w-full">
            <span className="inline-block px-1.5 py-0.5 mb-2 text-[10px] font-mono text-[#d4af37] border border-[#d4af37] bg-black/80">
              {event.category.toUpperCase()}
            </span>
            <h3 className="text-xl md:text-2xl font-cinzel font-bold text-white mb-1 group-hover:text-red-500 transition-colors drop-shadow-lg">
              {event.title}
            </h3>
            <p className="text-gray-300 text-xs flex items-center gap-1.5 font-mono">
              <Clock size={12} className="text-red-500" /> {event.time}
            </p>
          </div>
          <div className="writing-vertical-rl text-3xl font-noto font-bold text-white/10 absolute right-3 bottom-12 pointer-events-none">
            {event.japaneseTitle}
          </div>
        </div>

        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#050505] border border-red-900 rounded-sm p-5 flex flex-col relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#4a0000_0%,_#000000_100%)]"></div>
          <div className="z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4 border-b border-red-900/30 pb-3">
              <div>
                <h3 className="text-lg font-cinzel font-bold text-[#d4af37]">
                  {event.title}
                </h3>
                <p className="text-red-500 font-noto text-xs">
                  {event.japaneseTitle}
                </p>
              </div>
              <Zap className="text-red-500 w-4 h-4" />
            </div>
            <div className="space-y-3 flex-grow font-mono text-xs text-gray-300 overflow-y-auto">
              <p className="leading-relaxed text-gray-400 italic">
                "{event.description}"
              </p>
              <div className="space-y-2 pt-2 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <Calendar className="text-red-600 w-3 h-3" />
                  <span>{event.day}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-red-600 w-3 h-3" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="text-red-600 w-3 h-3" />
                  <span>{event.venue}</span>
                </div>
              </div>
            </div>

            {event.registrationLink && (
              
              <button
              disabled={isRegistered || isRegistering}
                className={`block text-center w-full mt-3 py-2 bg-red-900/10 hover:bg-red-900/30 border border-red-900/50 text-red-500 hover:text-white font-cinzel font-bold text-[10px] tracking-widest transition-all uppercase ${
                  isRegistering && 'cursor-wait'
                } ${isRegistered && 'cursor-not-allowed '}`}
                onClick={handleRegister}
              >
                {isRegistering ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    PROCESSING...
                  </>
                ) : (
                  'REGISTER'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
};

const App = () => {
  const [eventsData, setEventsData] = useState<StyledEvent[]>([]);
  const [categories, setCategories] = useState<ScrollOption[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [activeDay, setActiveDay] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth() 
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await eventService.getAllEvents();
        if (!response.events || response.events.length === 0) {
          setError("No events found. Please check back later.");
          return;
        }
        
        // Transform backend events to frontend format
        const transformedEvents = response.events.map(transformBackendEventToFrontend);
        setEventsData(transformedEvents);
        
        // Extract unique categories and days
        const uniqueCategories = getUniqueCategories(transformedEvents);
        const uniqueDays = getUniqueDays(transformedEvents);
        
        // Set categories with icons
        const categoriesWithIcons = uniqueCategories.map((cat) => ({
          id: cat,
          icon: CATEGORY_ICONS[cat] || Sparkles,
          label: cat,
        }));
        
        setCategories(categoriesWithIcons);
        setDays(uniqueDays);
        
        // Set initial active selections
        if (uniqueDays.length > 0) setActiveDay(uniqueDays[0]);
        if (uniqueCategories.length > 0) setActiveCategory(uniqueCategories[0]);
        
      } catch (err: any) {
        console.error("Failed to fetch events:", err);
        const errorMessage = err.response?.data?.message || err.message || "Failed to load events. Please try again later.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    const fetchEventsRegistered = async () => {

      
      if (!user || !user.id) {
        setRegisteredEventIds([])
        return
      }

      try {
        const response = await api.get(`/api/users/check/${user.id}`)
        setRegisteredEventIds(response.data)
      } catch (err) {
        console.error('Failed to fetch registered events:', err)
      }
    }

    fetchEvents();
    fetchEventsRegistered();
  }, []);


  const filteredEvents = eventsData.filter(event => 
    event.day === activeDay && event.category === activeCategory
  );

  const retryFetch = () => {
    setError(null);
    setLoading(true);
    // Re-trigger the useEffect by updating a dependency
    window.location.reload();
  };

  // Don't show full page loading - always show the layout
  return (
    <div className="min-h-screen bg-[#020202] overflow-x-hidden font-sans text-gray-100 selection:bg-red-900 pb-20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Shojumaru&family=Noto+Sans+JP:wght@300;700&family=JetBrains+Mono:wght@400;700&display=swap');
        .font-cinzel { font-family: 'Shojumaru', cursive; }
        .font-noto { font-family: 'Noto Sans JP', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .writing-vertical-rl { writing-mode: vertical-rl; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #500000; border-radius: 2px; }
      `}</style>

      {/* Red Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_#2a0000_0%,_#020202_80%)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] text-red-900 opacity-[0.05] font-noto font-bold select-none">
          祭
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(220,20,60,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(220,20,60,0.06)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#000000_100%)]"></div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6 flex flex-col items-center">
        <GlitchHeader />

        <div className="w-full flex justify-center gap-4 mb-12 z-40">
          <ScrollSelector
            options={days}
            selected={activeDay}
            onSelect={setActiveDay}
          />
          <ScrollSelector
            options={categories}
            selected={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>

        <div className="w-full max-w-6xl min-h-[50vh]">
          {loading ? (
            // Loading state - only for the events area
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37] mx-auto mb-4"></div>
                <p className="text-[#d4af37] font-cinzel">Loading Events...</p>
              </div>
            </div>
          ) : error ? (
            // Error state - only for the events area
            <div className="text-center py-20 border border-red-900/30 bg-black/20 backdrop-blur-sm rounded-sm mt-8 relative overflow-hidden">
              {/* Dark background pattern consistent with the page */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#4a0000_0%,_#000000_100%)] opacity-30"></div>
              <div className="absolute inset-0 bg-[linear-gradient(rgba(220,20,60,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(220,20,60,0.03)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
              
              <div className="relative z-10">
                <X className="w-12 h-12 text-red-500/80 mx-auto mb-4" />
                <h3 className="text-lg font-cinzel text-red-400 mb-2 tracking-wide">
                  Connection Failed
                </h3>
                <p className="text-gray-400 font-mono text-sm mb-6 max-w-md mx-auto leading-relaxed">
                  {error}
                </p>
                <button 
                  onClick={retryFetch} 
                  className="px-6 py-3 bg-red-900/20 border border-red-900/50 text-red-400 font-cinzel hover:bg-red-900/40 hover:text-red-300 transition-all duration-300 tracking-wide uppercase text-sm hover:shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                >
                  Retry Connection
                </button>
              </div>
            </div>
          ) : filteredEvents.length > 0 ? (
            // Events grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isRegistered={registeredEventIds.includes(event.id)}
                />
              ))}
            </div>
          ) : (
            // No events found
            <div className="text-center py-20 border border-red-900/30 bg-black/20 backdrop-blur-sm rounded-sm mt-8 relative overflow-hidden">
              {/* Dark background pattern consistent with the page */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#4a0000_0%,_#000000_100%)] opacity-20"></div>
              <div className="absolute inset-0 bg-[linear-gradient(rgba(220,20,60,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(220,20,60,0.03)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
              
              <div className="relative z-10">
                <X className="w-8 h-8 text-red-900/50 mx-auto mb-3" />
                <h3 className="text-lg font-cinzel text-gray-400 tracking-wide">
                  Archives Empty
                </h3>
                <p className="text-gray-500 font-mono text-xs mt-2 tracking-widest uppercase">
                  No events found for this selection
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;