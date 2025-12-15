
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black px-6 py-24">
      <div className="mx-auto max-w-7xl">

        
        <div className="rounded-3xl bg-gradient-to-br from-[#0b1022] via-[#070b18] to-[#040611] px-10 py-16 shadow-2xl">

          
          <div className="grid gap-16 lg:grid-cols-2 items-start">

            
            <div>
              <Image
                src="/logo.svg"
                alt="Samavesh X Vassaunt Logo"
                width={80}
                height={80}
                className="mb-6"
                priority
              />

              <h2 className="max-w-md text-4xl font-light leading-tight text-white">
                Samavesh X Vassaunt
              </h2>

              <p className="mt-6 text-sm text-zinc-400">
                Made with <span className="text-red-500">❤</span> by Enigma VSSUT
              </p>
            </div>

            
            <div className="text-zinc-300">

              
              <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">
                Quick Links
              </h4>

              <ul className="space-y-4 text-sm">
                <li>
                  <Link href="/" className="hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:text-white transition">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/committee" className="hover:text-white transition">
                    Committees
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="hover:text-white transition">
                    The Team
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition">
                    Contact Us
                  </Link>
                </li>
              </ul>

              
              <div className="mt-10">
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                  Follow Us
                </h4>

                <div className="flex gap-6 text-lg text-white">
                  <span className="cursor-pointer hover:text-violet-400 transition">
                    𝕏
                  </span>
                  <span className="cursor-pointer hover:text-violet-400 transition">
                    f
                  </span>
                  <span className="cursor-pointer hover:text-violet-400 transition">
                    ◎
                  </span>
                </div>
              </div>

            </div>
          </div>

          
          <div className="mt-16 h-px bg-white/10" />

          
          <p className="mt-6 text-center text-xs text-zinc-500">
            © 2025. All Rights Reserved
          </p>

        </div>
      </div>
    </footer>
  );
}

