"use client"

import { useState, useEffect, useRef } from "react"

import eventsData from "@/events-temp.json"
import Card from "@/components/Card"
import { EventItems } from "@/types/Event"

const CATEGORIES = ["Technical", "Cultural", "Fun"]
const DAYS = ["Day 1", "Day 2", "Day 3"]


export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("Technical")
  const [activeDay, setActiveDay] = useState("Day 1")
  const [selectedEvent, setSelectedEvent] = useState<EventItems | null>(null)
  const modalContentRef = useRef<HTMLDivElement>(null)
  const categoryRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})
  const dayRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})
  const [categoryIndicatorStyle, setCategoryIndicatorStyle] = useState({ left: 0, width: 0 })
  const [dayIndicatorStyle, setDayIndicatorStyle] = useState({ top: 0, height: 0 })

  const filteredEvents = eventsData.events.filter(
    (event) =>
      event.category === activeCategory &&
      event.day === activeDay
  )

  
  useEffect(() => {
    const activeButton = categoryRefs.current[activeCategory]
    if (activeButton) {
      const { offsetLeft, offsetWidth } = activeButton
      setCategoryIndicatorStyle({ left: offsetLeft, width: offsetWidth })
    }
  }, [activeCategory])


  useEffect(() => {
    const activeButton = dayRefs.current[activeDay]
    if (activeButton) {
      const { offsetTop, offsetHeight } = activeButton
      setDayIndicatorStyle({ top: offsetTop, height: offsetHeight })
    }
  }, [activeDay])

  
  useEffect(() => {
    const activeCategoryButton = categoryRefs.current[activeCategory]
    if (activeCategoryButton) {
      const { offsetLeft, offsetWidth } = activeCategoryButton
      setCategoryIndicatorStyle({ left: offsetLeft, width: offsetWidth })
    }
    
    const activeDayButton = dayRefs.current[activeDay]
    if (activeDayButton) {
      const { offsetTop, offsetHeight } = activeDayButton
      setDayIndicatorStyle({ top: offsetTop, height: offsetHeight })
    }
  }, [])

  
  useEffect(() => {
    if (selectedEvent && modalContentRef.current) {
      modalContentRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [selectedEvent])

  return (
    <>
      <section className="min-h-screen bg-[#E0E5EC] text-[#4A5568] px-6 py-16 scroll-smooth">
        
        <h1 className="text-center text-5xl mb-12">
          Event Timeline
        </h1>

        <div className="flex justify-center gap-10 mb-14 relative">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              ref={(el) => { categoryRefs.current[cat] = el }}
              onClick={() => setActiveCategory(cat)}
              className={`uppercase tracking-wide pb-2 relative z-10 transition-colors duration-300
                ${
                  activeCategory === cat
                    ? "text-[#4A5568]"
                    : "text-zinc-500 hover:text-[#2d3748]"
                }
              `}
            >
              {cat}
            </button>
          ))}
          
          <div
            className="absolute bottom-0 h-[2px] bg-[#2d3748] transition-all duration-500 ease-in-out"
            style={{
              left: `${categoryIndicatorStyle.left}px`,
              width: `${categoryIndicatorStyle.width}px`,
            }}
          />
        </div>

        
        <div className="grid grid-cols-[120px_1fr] gap-10 max-w-7xl mx-auto">

          
          <div className="flex flex-col gap-8 text-[#4A5568]/70 relative">
            {DAYS.map((day) => (
              <button
                key={day}
                ref={(el) => { dayRefs.current[day] = el }}
                onClick={() => setActiveDay(day)}
                className={`text-left uppercase tracking-wide relative pl-4 transition-colors duration-300 z-10
                  ${
                    activeDay === day
                      ? "text-[#4A5568]"
                      : "hover:text-[#2d3748]"
                  }
                `}
              >
                {day}
              </button>
            ))}
            
            <div
              className="absolute left-0 w-[2px] bg-[#2d3748] transition-all duration-500 ease-in-out"
              style={{
                top: `${dayIndicatorStyle.top}px`,
                height: `${dayIndicatorStyle.height}px`,
              }}
            />
          </div>

          
          <div
            key={`${activeCategory}-${activeDay}`}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-[fadeInSlide_0.4s_ease-out]"
          >
            {filteredEvents.length === 0 && (
              <p className="text-zinc-500 col-span-full">
                No events scheduled for this day.
              </p>
            )}

            {filteredEvents.map((event) => (
              <Card
                key={event.id}
                clickable
                classname="bg-[#f6f8fb] text-[#2d3748] border border-[#d7dee8] shadow-md shadow-[#c7ced8] transition-transform duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[#c1c9d4] cursor-pointer"
                onClick={() => {
                  setSelectedEvent(event)
                  
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <h3 className="text-lg font-semibold mb-2">
                  {event.title}
                </h3>

                <p className="text-sm text-[#4A5568]/90 mb-3">
                  {event.shortDescription}
                </p>

                <div className="text-xs text-[#4A5568]/80 space-y-1">
                  <p>{event.time}</p>
                  <p>{event.venue}</p>
                  <p className="italic">{event.organizingClub}</p>
                </div>
              </Card>
            ))}
          </div>

        </div>
      </section>


      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50 p-6 transition-opacity duration-300 animate-[fadeIn_0.3s_ease-in-out]"
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            ref={modalContentRef}
            className="bg-[#E0E5EC] border-none shadow-neu-flat rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto scroll-smooth transition-all duration-300 animate-[slideUp_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
            style={{ scrollBehavior: 'smooth' }}
          >

            <div className="w-full h-64 bg-[#cfd6df] flex items-center justify-center">
              <img 
                src="https://placehold.co/600x400?text=Thamba\nLoading..." 
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
            </div>


            <div className="p-8 bg-[#f6f8fb]">
              <h2 className="text-3xl font-bold mb-4 text-[#2d3748] ">{selectedEvent.title}</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <p className="text-[#4A5568]/70">Time</p>
                  <p className="text-[#2d3748]">{selectedEvent.time}</p>
                </div>
                <div>
                  <p className="text-[#4A5568]/70">Venue</p>
                  <p className="text-[#2d3748]">{selectedEvent.venue}</p>
                </div>
                <div>
                  <p className="text-[#4A5568]/70">Category</p>
                  <p className="text-[#2d3748]">{selectedEvent.category}</p>
                </div>
                <div>
                  <p className="text-[#4A5568]/70">Organizing Club</p>
                  <p className="text-[#2d3748]">{selectedEvent.organizingClub}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#2d3748] mb-2">Description</h3>
                <p className="text-[#4A5568]/90">{selectedEvent.description}</p>
              </div>

              {selectedEvent.rules && selectedEvent.rules.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-[#2d3748] mb-2">Rules</h3>
                  <ul className="list-disc list-inside text-[#4A5568]/90 space-y-1">
                    {selectedEvent.rules.map((rule, index) => (
                      <li key={index}>{rule}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedEvent.contact && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-[#2d3748] mb-2">Contact</h3>
                  <p className="text-[#2d3748]">{selectedEvent.contact.name}</p>
                  <p className="text-[#4A5568]/80">{selectedEvent.contact.phone}</p>
                </div>
              )}

              <button
                onClick={() => setSelectedEvent(null)}
                className="w-full bg-[#d7dde6] text-[#2d3748] py-3 rounded-lg font-semibold shadow-neu-flat hover:bg-[#cfd6df] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}