import Image from "next/image";

import Card from "@/components/Card";

import { honourableMentions, studentBodies } from "@/utils/teamData";

export default function TeamPage() {
  return (
    <section className="bg-[#E0E5EC] px-6 py24 text-[#4A5568]">
      <div className="mb-20 text-right">
        <a href="/committees">
        <h2 className="text-sm uppercase tracking-widest text-blue-500">
          CLUBS & COMMITTEES
          <span className="text-lg "> ↗</span>
        </h2>
</a>
        <h1 className="mt-2 text-4xl font-bold text-center">THE TEAM</h1>
        <p className="mt-1 text-gray-400 text-center">Hon&apos;ble Mentions</p>
      </div>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {honourableMentions.map((member) => (
          <Card key={member.id} classname="bg-[#f6f8fb] border border-white/10">
            <div className="text-center">
              <div className="relative mx-auto h-70 w-70 overflow-hidden rounded-xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
              <p className="mt-1 text-sm text-gray-400">{member.designation}</p>
            </div>
          </Card>
        ))}
      </div>


      <div className="mt-32 text-center">
        <h1 className="text-4xl font-bold">STUDENT BODIES</h1>
      </div>
       
      <div className="mt-12 grid gap-10 sm:grid-cols-3 justify-center">
        {studentBodies.map((member) => (
          <Card key={member.id} classname="bg-[#f6f8fb]  border border-white/10">
            <div className="text-center ">
              <div  className="relative mx-auto h-70 w-70 overflow-hidden rounded-xl ">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
              <p className="mt-1 text-sm text-gray-400">{member.designation}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
