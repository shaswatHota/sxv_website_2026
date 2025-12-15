import Image from "next/image";
import { clubs } from "@/utils/clubData";
import Card from "@/components/Card";

export default function ClubsPage() {
  return (
    <section className="min-h-screen bg-black px-6 py-24 text-white">
   
      <div className="mb-20 text-center">
        <h1 className="text-4xl font-bold tracking-wide">
          ORGANIZING CLUBS & SOCIETIES
        </h1>
        <p className="mt-4 text-gray-400">
          Explore the vibrant student communities of our college
        </p>
      </div>

 
      <div className="columns-1 gap-8 sm:columns-2 lg:columns-3">
        {clubs.map((club) => (
          <div key={club.id} className="mb-6 break-inside-avoid">
            {club.type === "image" ? (
            
              <Card classname="overflow-hidden rounded-2xl bg-white shadow-lg">
                <div className="relative h-[420px] w-full">
                  <Image
                    src={club.image!}
                    alt={club.name}
                    fill
                    className="object-cover"
                  />

                <div className="absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

             
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  
                  <h3 className="text-lg font-semibold tracking-wide">
                    {club.name}
                  </h3>
                  </div>
                </div>
              </Card>
            ) : (
              <Card classname="bg-[#1f2933] text-white rounded-2xl p-8 h-[420px] flex items-center">
                <p className="text-lg leading-relaxed font-medium">
                  {club.name}
                </p>
              </Card>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
