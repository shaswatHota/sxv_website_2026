import Image from "next/image";
import Card from "@/components/Card";
import { clubs } from "@/utils/clubData";

export default function CommitteesPage() {
  return (
    <section className="bg-black px-6 py-24 text-white">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold">
          ORGANIZING CLUBS AND SOCIETIES
        </h1>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
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

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  <div className="absolute bottom-0 p-5 text-white">
                    <h3 className="text-lg font-semibold leading-snug">
                      {club.name}
                    </h3>

                    <div className="mt-3 flex -space-x-2">
                      <div className="h-8 w-8 rounded-full bg-white border" />
                      <div className="h-8 w-8 rounded-full bg-white border" />
                      <div className="h-8 w-8 rounded-full bg-white border" />
                    </div>
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
