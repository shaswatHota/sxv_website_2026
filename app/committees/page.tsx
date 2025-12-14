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
           
            
              <Card classname="overflow-hidden rounded-2xl bg-transparent">
                <div className="relative h-[420px] w-full">
                  <Image
                    src={club.image}
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
                      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum magni eaque nostrum praesentium, fuga quasi quis quod, necessitatibus illum accusantium deserunt. Doloremque, ipsam.</p>
                    </div>
                  </div>
                </div>
              </Card>
           
          
          </div>
        ))}
      </div>
    </section>
  );
}
