"use client";

import Image from "next/image";
import { useState } from "react";
import { clubs } from "@/utils/clubData";

export default function ClubsPage() {
  const [showAll, setShowAll] = useState(false);
  const visibleClubs = showAll ? clubs : clubs.slice(0, 5);
  return (
    <section className="min-h-screen bg-[#E0E5EC] px-6 py-24 text-[#4A5568]">
      
      <div className="mb-20 text-center">
        <h1 className="text-4xl font-bold tracking-wide">
          ORGANIZING CLUBS & SOCIETIES
        </h1>
        <p className="mt-4 text-gray-400">
          Explore the vibrant student communities of our college
        </p>
      </div>

      <div className="mx-auto max-w-6xl rounded-[40px] bg-[#E0E5EC] shadow-2xl p-8">
        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gridAutoRows: "120px" }}
        >
          {visibleClubs.map((club, index) => (
            <div
              key={club.id}
              className={`group relative overflow-hidden rounded-[28px] bg-[#0B0F19] ${getHeight(
                index
              )}`}
            >
              <Image
                src={club.image}
                alt={club.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-lg font-semibold">{club.name}</h3>
                <p className="mt-2 text-sm text-gray-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {club.description}
                </p>
              </div>
            </div>
          ))}

          {!showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="flex items-center justify-center rounded-[28px] bg-black text-lg font-semibold hover:bg-[#11152a]"
              style={{ gridRow: "span 3" }}
            >
              Click here to <br /> explore more clubs →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function getHeight(index: number) {
  const heights = [
    "row-span-3",
    "row-span-4",
    "row-span-3",

    "row-span-3",
 "row-span-4",
    "row-span-4",
  ];
  return heights[index % heights.length];
}