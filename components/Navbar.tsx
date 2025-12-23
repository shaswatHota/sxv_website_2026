'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { Menu, X } from 'lucide-react'

type NavbarProps = {
  isLoggedIn?: Boolean
  onSignOut?: () => {}
}

type navItem = {
  label: string
  href: string
  japanese: string
}

const navItems: navItem[] = [
  { label: 'Home', href: '/', japanese: 'ホーム' },
  { label: 'Events', href: '/events', japanese: 'イベント' },
  { label: 'Team', href: '/team', japanese: 'チーム' },
  { label: 'Committees', href: '/committees', japanese: '委員会' },
  { label: 'Contact Us', href: '/contactUs', japanese: 'お問い合わせ' },
]

// Particle and Slash effect classes
class InkParticle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  decay: number
  size: number
  color: string

  constructor(x: number, y: number, color: string) {
    this.x = x
    this.y = y
    const angle = Math.random() * Math.PI * 2
    const speed = Math.random() * 2 + 1
    this.vx = Math.cos(angle) * speed
    this.vy = Math.sin(angle) * speed
    this.life = 1.0
    this.decay = Math.random() * 0.03 + 0.01
    this.size = Math.random() * 3 + 1
    this.color = color
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.vx *= 0.95
    this.vy *= 0.95
    this.life -= this.decay
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = this.life
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1.0
  }
}

class Slash {
  x: number
  y: number
  targetWidth: number
  currentWidth: number
  life: number
  color: string
  particles: InkParticle[]
  triggeredParticles: boolean

  constructor(x: number, y: number, width: number, color = '#fff') {
    this.x = x
    this.y = y
    this.targetWidth = width
    this.currentWidth = 0
    this.life = 1.0
    this.color = color
    this.particles = []
    this.triggeredParticles = false
  }

  update() {
    this.currentWidth += (this.targetWidth - this.currentWidth) * 0.2
    this.life -= 0.02

    if (this.currentWidth > this.targetWidth * 0.5 && !this.triggeredParticles) {
      for (let i = 0; i < 15; i++) {
        const px = this.x + Math.random() * this.currentWidth
        const py = this.y + (Math.random() - 0.5) * 4
        this.particles.push(new InkParticle(px, py, this.color))
      }
      this.triggeredParticles = true
    }

    this.particles.forEach(p => p.update())
    this.particles = this.particles.filter(p => p.life > 0)
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.life <= 0 && this.particles.length === 0) return

    if (this.life > 0) {
      ctx.globalAlpha = this.life * 0.8
      ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.moveTo(this.x, this.y)
      ctx.lineTo(this.x + this.currentWidth, this.y - 2)
      ctx.lineTo(this.x + this.currentWidth + 10, this.y + 1)
      ctx.lineTo(this.x, this.y + 3)
      ctx.fill()

      ctx.shadowBlur = 10
      ctx.shadowColor = this.color
      ctx.fill()
      ctx.shadowBlur = 0
    }

    this.particles.forEach(p => p.draw(ctx))
    ctx.globalAlpha = 1.0
  }
}

export default function Navbar({ isLoggedIn = false, onSignOut }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const slashesRef = useRef<Slash[]>([])
  const animationIdRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      slashesRef.current.forEach(slash => {
        slash.update()
        slash.draw(ctx)
      })
      
      slashesRef.current = slashesRef.current.filter(s => s.life > 0 || s.particles.length > 0)
      animationIdRef.current = requestAnimationFrame(animate)
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('scroll', handleScroll)
    
    resizeCanvas()
    animate()

    // Logo animation interval
    const logoInterval = setInterval(() => {
      const logoElement = document.getElementById('main-logo')
      if (logoElement) {
        createSlash(logoElement)
      }
    }, 3000)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('scroll', handleScroll)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      clearInterval(logoInterval)
    }
  }, [])

  const createSlash = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    const startX = rect.left
    const startY = rect.top + (rect.height / 2)
    const isGold = Math.random() > 0.6
    const color = element.dataset.color || (isGold ? '#fbbf24' : '#e5e5e5')
    
    slashesRef.current.push(new Slash(startX, startY, rect.width, color))
  }

  const handleHover = (event: React.MouseEvent<HTMLElement>) => {
    createSlash(event.currentTarget)
  }

  return (
    <>
      {/* Canvas for effects */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[60]"
      />
      
      {/* Washi Paper Texture Overlay */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-50 mix-blend-overlay opacity-40" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")`
           }} />

      {/* Navigation Bar */}
      <nav className="fixed w-full z-40 top-0 transition-all duration-500 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800 shadow-lg shadow-black/50">
        {/* Bottom red accent line */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#bd0029] to-transparent opacity-100 overflow-hidden z-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
        </div>

        <div className="max-w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? 'h-20' : 'h-24'}`}>
            
            {/* Logo Section */}
            <div 
              id="main-logo"
              className="flex-shrink-0 flex items-center cursor-pointer group"
              data-color="#bd0029"
              onMouseEnter={handleHover}
            >
              <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center mr-3 md:mr-4">
                <div className="absolute inset-0 bg-[#bd0029] rounded-full animate-pulse shadow-[0_0_20px_rgba(189,0,41,0.4)]" />
                <span className="relative text-white font-black text-2xl md:text-3xl z-10 group-hover:scale-110 transition-transform duration-300">
                  祭
                </span>
              </div>
              <div className="flex flex-col justify-center items-start leading-tight">
                <span className="font-black text-sm md:text-lg tracking-[0.1em] uppercase text-white transition-colors duration-300 whitespace-nowrap">
                  SAMAVESH
                </span>
                <span className="font-black text-sm md:text-lg tracking-[0.1em] uppercase text-white transition-colors duration-300 whitespace-nowrap">
                  x VASSAUNT
                </span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-6">
              {navItems.map((item, id) => (
                <Link 
                  key={id}
                  href={item.href}
                  className="relative px-3 py-2 font-bold text-sm text-neutral-300 hover:text-amber-400 transition-colors duration-200 group"
                  onMouseEnter={handleHover}
                >
                  <span className="block text-[0.6rem] text-red-600 opacity-70 mb-[-2px]">
                    {item.japanese}
                  </span>
                  {item.label.toUpperCase()}
                </Link>
              ))}
            </div>

            {/* Login / Register Section (Desktop) */}
            <div className="hidden lg:flex items-center space-x-3 pl-4 border-l border-neutral-800 ml-4">
              <Link 
                href="/login"
                className="relative px-8 py-2 border border-neutral-600 hover:border-neutral-400 bg-black/40 transition-all duration-300 group flex flex-col items-center justify-center min-w-[100px]"
                data-color="#fbbf24"
                onMouseEnter={handleHover}
                style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)' }}
              >
                <span className="font-bold text-neutral-300 group-hover:text-amber-400 text-sm tracking-widest">
                  LOGIN
                </span>
                <span className="text-[0.5rem] text-neutral-600 group-hover:text-amber-400/70 transition-colors">
                  入
                </span>
              </Link>

              <Link 
                href="/signup"
                className="relative px-8 py-2 bg-[#bd0029] hover:bg-red-800 transition-all duration-300 group overflow-hidden flex flex-col items-center justify-center min-w-[120px]"
                data-color="#ffffff"
                onMouseEnter={handleHover}
                style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)' }}
              >
                <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out z-0 skew-x-[-20deg]" />
                <div className="relative z-10 flex flex-col items-center">
                  <span className="font-bold text-white group-hover:text-black text-sm tracking-widest">
                    REGISTER
                  </span>
                  <span className="text-[0.5rem] text-black/50 group-hover:text-red-600">
                    登録
                  </span>
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-[#bd0029] focus:outline-none transition-colors p-2 z-50 relative"
              >
                {isMenuOpen ? (
                  <X className="w-8 h-8 stroke-[2] stroke-[#bd0029]" />
                ) : (
                  <Menu className="w-8 h-8 stroke-[2]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-neutral-950 z-30 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] flex flex-col pt-24 overflow-y-auto ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col md:flex-row h-full">
          <div className="flex-1 flex flex-col items-center md:items-start justify-center space-y-6 md:pl-20 py-10">
            {navItems.map((item, id) => (
              <Link 
                key={id}
                href={item.href}
                className="group relative flex items-center w-full md:w-auto justify-center md:justify-start"
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={handleHover}
                style={{ animationDelay: `${0.05 * (id + 1)}s` }}
              >
                <div className="text-right mr-4 hidden md:block">
                  <span className="block text-xs text-[#bd0029] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.japanese}
                  </span>
                </div>
                <span className="font-black text-4xl sm:text-5xl text-neutral-600 hover:text-white transition-all duration-300 uppercase tracking-tighter hover:translate-x-4">
                  {item.label}
                </span>
              </Link>
            ))}

            <div className="w-24 h-[1px] bg-neutral-800 my-4" />

            <div className="flex space-x-4 px-6 md:px-0 w-full md:w-auto justify-center md:justify-start">
              <Link 
                href="/login"
                className="px-8 py-3 border border-stone-600 text-stone-300 text-center hover:bg-stone-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                LOGIN
              </Link>
              <Link 
                href="/signup"
                className="px-8 py-3 bg-[#bd0029] text-white text-center hover:bg-red-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                REGISTER
              </Link>
            </div>
          </div>

          {/* Decorative Side Panel */}
          <div className="hidden lg:flex w-1/3 h-full border-l border-neutral-800 bg-neutral-900 flex-col justify-end p-10 pb-32 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay" 
                 style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop')" }} />
            <div className="relative z-10">
              <div className="w-20 h-20 bg-[#bd0029] rounded-full mb-8 shadow-[0_0_30px_rgba(189,0,41,0.4)] flex items-center justify-center">
                <span className="text-white text-4xl font-bold">祭</span>
              </div>
              <h3 className="text-4xl font-black mb-4 text-white">文化祭</h3>
              <div className="w-12 h-1 bg-[#bd0029] mb-6" />
              <p className="text-neutral-400 text-sm leading-relaxed">
                Samavesh x Vassaunt<br />
                Where tradition meets the future.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className={`transition-all duration-300 ${isScrolled ? 'h-20' : 'h-24'}`} />
    </>
  )
}
