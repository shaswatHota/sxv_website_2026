"use client"

import { useState } from "react"

import eventsData from "@/events-temp.json"
import Card from "@/components/Card"
import { EventItems } from "@/types/Event"

const CATEGORIES = ["Technical", "Cultural", "Fun"]
const DAYS = ["Day 1", "Day 2", "Day 3"]


export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("Technical")
  const [activeDay, setActiveDay] = useState("Day 1")
  const [selectedEvent, setSelectedEvent] = useState<EventItems | null>(null)

  const filteredEvents = eventsData.events.filter(
    (event) =>
      event.category === activeCategory &&
      event.day === activeDay
  )

  return (
    <>
      <section className="min-h-screen bg-black text-white px-6 py-16">
        
        <h1 className="text-center text-5xl mb-12">
          Event Timeline
        </h1>

        <div className="flex justify-center gap-10 mb-14">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`uppercase tracking-wide pb-2 border-b-2 transition
                ${
                  activeCategory === cat
                    ? "border-white text-white"
                    : "border-transparent text-zinc-500 hover:text-white"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Timeline Layout */}
        <div className="grid grid-cols-[120px_1fr] gap-10 max-w-7xl mx-auto">

          {/* Day Selector */}
          <div className="flex flex-col gap-8 text-zinc-400">
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`text-left uppercase tracking-wide relative pl-4
                  ${
                    activeDay === day
                      ? "text-white before:absolute before:left-0 before:top-1 before:h-5 before:w-[2px] before:bg-white"
                      : "hover:text-white"
                  }
                `}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Events */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.length === 0 && (
              <p className="text-zinc-500">
                No events scheduled for this day.
              </p>
            )}

            {filteredEvents.map((event) => (
              <Card
                key={event.id}
                clickable
                classname="bg-zinc-900 text-white border border-zinc-800"
                onClick={() => setSelectedEvent(event)}
              >
                <h3 className="text-lg font-semibold mb-2">
                  {event.title}
                </h3>

                <p className="text-sm text-zinc-400 mb-3">
                  {event.shortDescription}
                </p>

                <div className="text-xs text-zinc-500 space-y-1">
                  <p>{event.time}</p>
                  <p>{event.venue}</p>
                  <p className="italic">{event.organizingClub}</p>
                </div>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50 p-6"
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className="bg-zinc-900 border border-zinc-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="w-full h-64 bg-zinc-800 flex items-center justify-center">
              <img 
                src="https://via.placeholder.com/800x400?text=Event+Image" 
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4">{selectedEvent.title}</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <p className="text-zinc-500">Time</p>
                  <p className="text-white">{selectedEvent.time}</p>
                </div>
                <div>
                  <p className="text-zinc-500">Venue</p>
                  <p className="text-white">{selectedEvent.venue}</p>
                </div>
                <div>
                  <p className="text-zinc-500">Category</p>
                  <p className="text-white">{selectedEvent.category}</p>
                </div>
                <div>
                  <p className="text-zinc-500">Organizing Club</p>
                  <p className="text-white">{selectedEvent.organizingClub}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Description</h3>
                <p className="text-zinc-300">{selectedEvent.description}</p>
              </div>

              {selectedEvent.rules && selectedEvent.rules.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Rules</h3>
                  <ul className="list-disc list-inside text-zinc-300 space-y-1">
                    {selectedEvent.rules.map((rule, index) => (
                      <li key={index}>{rule}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedEvent.contact && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Contact</h3>
                  <p className="text-zinc-300">{selectedEvent.contact.name}</p>
                  <p className="text-zinc-400">{selectedEvent.contact.phone}</p>
                </div>
              )}

              <button
                onClick={() => setSelectedEvent(null)}
                className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-zinc-200 transition"
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