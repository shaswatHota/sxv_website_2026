'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
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

class BackgroundEffect {
  width: number
  height: number
  kanji: string
  floatingTexts: Array<{
    char: string
    x: number
    y: number
    vx: number
    vy: number
    size: number
    opacity: number
  }>

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.kanji = "風林火山侍魂花鳥風月"
    this.floatingTexts = []
    
    const count = width < 768 ? 5 : 10
    for(let i = 0; i < count; i++) {
      this.addText()
    }
  }

  addText() {
    this.floatingTexts.push({
      char: this.kanji[Math.floor(Math.random() * this.kanji.length)],
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 20 + 10,
      opacity: Math.random() * 0.1
    })
  }

  update() {
    this.floatingTexts.forEach(t => {
      t.x += t.vx
      t.y += t.vy
      if (t.x < 0) t.x = this.width
      if (t.x > this.width) t.x = 0
      if (t.y < 0) t.y = this.height
      if (t.y > this.height) t.y = 0
    })
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#c5a059'
    ctx.font = '20px "Shippori Mincho"'
    this.floatingTexts.forEach(t => {
      ctx.globalAlpha = t.opacity
      ctx.fillText(t.char, t.x, t.y)
    })
    ctx.globalAlpha = 1.0
  }
}

export default function Navbar({ isLoggedIn = false, onSignOut }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const slashesRef = useRef<Slash[]>([])
  const animationIdRef = useRef<number>()
  const bgEffectRef = useRef<BackgroundEffect | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      bgEffectRef.current = new BackgroundEffect(canvas.width, canvas.height)
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      if (bgEffectRef.current) {
        bgEffectRef.current.update()
        bgEffectRef.current.draw(ctx)
      }
      
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
    let color = isGold ? '#fbbf24' : '#e5e5e5'
    
    if (element.dataset.color) {
      color = element.dataset.color
    }
    
    slashesRef.current.push(new Slash(startX, startY, rect.width, color))
  }

  const handleHover = (event: React.MouseEvent<HTMLElement>) => {
    createSlash(event.currentTarget)
  }

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }

  return (
    <>
      {/* Canvas for effects */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[60]"
        id="effect-canvas"
      />
      
      {/* Washi Paper Texture Overlay */}
      <div className="fixed inset-0 w-full h-full washi-texture z-50 mix-blend-overlay pointer-events-none" />

      {/* Navigation Bar */}
      <nav className="fixed w-full z-40 top-0 transition-all duration-500 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800 nav-enter shadow-lg shadow-black/50" id="navbar">
        {/* Bottom red accent line */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#bd0029] to-transparent opacity-100 red-line-sheen overflow-hidden z-20" id="nav-border-glow" />

        <div className="max-w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? 'h-20' : 'h-24'}`} id="nav-container">
            
            {/* Logo Section */}
            <div 
              id="main-logo"
              className="flex-shrink-0 flex items-center cursor-pointer group hover-trigger"
              data-color="#bd0029"
              onMouseEnter={handleHover}
            >
              <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center mr-3 md:mr-4">
                <div className="sun-circle absolute inset-0 bg-[#bd0029] rounded-full sun-animate" />
                <span className="relative text-white font-serif-jp font-black text-2xl md:text-3xl z-10 group-hover:scale-110 transition-transform duration-300">
                  祭
                </span>
              </div>
              <div className="flex flex-col justify-center items-start leading-tight">
                <span className="font-serif-jp font-black text-sm md:text-lg tracking-[0.1em] uppercase animate-text-main transition-colors duration-300 whitespace-nowrap">
                  SAMAVESH
                </span>
                <span className="font-serif-jp font-black text-sm md:text-lg tracking-[0.1em] uppercase animate-text-main transition-colors duration-300 whitespace-nowrap">
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
                  className="katana-link hover-trigger font-shippori font-bold text-sm text-neutral-300"
                  onMouseEnter={handleHover}
                >
                  <span className="block text-[0.6rem] text-red-600 font-serif-jp opacity-70 mb-[-2px]">
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
                className="relative px-8 py-2 border border-neutral-600 hover:border-neutral-400 bg-black/40 transition-all duration-300 clip-path-slant group hover-trigger flex flex-col items-center justify-center min-w-[100px]"
                data-color="#fbbf24"
                onMouseEnter={handleHover}
              >
                <span className="font-serif-jp font-bold text-neutral-300 group-hover:text-amber-400 text-sm tracking-widest">
                  LOGIN
                </span>
                <span className="text-[0.5rem] font-serif-jp text-neutral-600 group-hover:text-amber-400/70 transition-colors">
                  入
                </span>
              </Link>

              <Link 
                href="/signup"
                className="relative px-8 py-2 bg-[#bd0029] hover:bg-red-800 transition-all duration-300 clip-path-slant group overflow-hidden hover-trigger flex flex-col items-center justify-center min-w-[120px]"
                data-color="#ffffff"
                onMouseEnter={handleHover}
              >
                <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out z-0 skew-x-[-20deg]" />
                <div className="relative z-10 flex flex-col items-center">
                  <span className="font-serif-jp font-bold text-white group-hover:text-black text-sm tracking-widest">
                    REGISTER
                  </span>
                  <span className="text-[0.5rem] font-serif-jp text-black/50 group-hover:text-red-600">
                    登録
                  </span>
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button 
                onClick={handleMenuToggle}
                className="text-white hover:text-[#bd0029] focus:outline-none transition-colors p-2 flash-red z-50 relative"
                id="mobile-menu-btn"
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
      <div 
        className={`fixed inset-0 bg-neutral-950 z-30 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] flex flex-col pt-24 overflow-y-auto no-scrollbar ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        id="mobile-menu"
      >
        <div className="flex flex-col md:flex-row h-full">
          <div className="flex-1 flex flex-col items-center md:items-start justify-center space-y-6 md:pl-20 py-10">
            {navItems.map((item, id) => (
              <Link 
                key={id}
                href={item.href}
                className="group relative flex items-center mobile-link hover-trigger w-full md:w-auto justify-center md:justify-start animate-menu-item"
                onClick={() => {
                  setIsMenuOpen(false)
                  document.body.style.overflow = ''
                }}
                onMouseEnter={handleHover}
                style={{ animationDelay: `${0.05 * (id + 1)}s` }}
              >
                <div className="text-right mr-4 hidden md:block">
                  <span className="block text-xs text-[#bd0029] font-sans-jp tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.japanese}
                  </span>
                </div>
                <span className="font-serif-jp font-black text-4xl sm:text-5xl text-neutral-600 hover:text-white transition-all duration-300 uppercase tracking-tighter hover:translate-x-4">
                  {item.label}
                </span>
              </Link>
            ))}

            <div className="w-24 h-[1px] bg-neutral-800 my-4 mobile-link animate-menu-item" style={{ animationDelay: '0.3s' }} />

            <div className="flex space-x-4 mobile-link px-6 md:px-0 w-full md:w-auto justify-center md:justify-start animate-menu-item" style={{ animationDelay: '0.35s' }}>
              <Link 
                href="/login"
                className="px-8 py-3 border border-stone-600 text-stone-300 font-shippori text-center hover:bg-stone-800 transition-colors hover-trigger"
                data-color="#fbbf24"
                onClick={() => {
                  setIsMenuOpen(false)
                  document.body.style.overflow = ''
                }}
              >
                LOGIN
              </Link>
              <Link 
                href="/signup"
                className="px-8 py-3 bg-[#bd0029] text-white font-shippori text-center hover:bg-red-800 transition-colors hover-trigger"
                data-color="#ffffff"
                onClick={() => {
                  setIsMenuOpen(false)
                  document.body.style.overflow = ''
                }}
              >
                REGISTER
              </Link>
            </div>
          </div>

          {/* Decorative Side Panel */}
          <div className="hidden lg:flex w-1/3 h-full border-l border-neutral-800 bg-neutral-900 flex-col justify-end p-10 pb-32 relative overflow-hidden">
            <div 
              className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop')" }}
            />
            <div className="relative z-10">
              <div className="w-20 h-20 bg-[#bd0029] rounded-full mb-8 shadow-[0_0_30px_rgba(189,0,41,0.4)] flex items-center justify-center">
                <span className="text-white font-serif-jp text-4xl font-bold">祭</span>
              </div>
              <h3 className="font-serif-jp text-4xl font-black mb-4 text-white">文化祭</h3>
              <div className="w-12 h-1 bg-[#bd0029] mb-6" />
              <p className="text-neutral-400 text-sm leading-relaxed font-sans-jp">
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