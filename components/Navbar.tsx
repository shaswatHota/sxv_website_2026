'use client'

import Link from 'next/link'
import Button from './Button'
import HamburgerButton from './MenuButton'
import { useState } from 'react'
import { motion } from 'motion/react'

type NavbarProps = {
  isLoggedIn?: Boolean
  onSignOut?: () => {}
}

type navItem = {
  label: String
  href: String
}

const navItems: navItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/events' },
  { label: 'Committees', href: '/committees' },
  { label: 'Team', href: '/team' },
  { label: 'Contact Us', href: '/contactUs' },
]

export default function Navbar({ isLoggedIn = false, onSignOut }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  return (
    /* 🔑 KEY FIX: absolute + transparent */
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">
              SamaveshXVassaunt
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="lg:flex items-center hidden">
            <ul className="flex gap-5">
              {navItems.map((item, id) => (
                <li
                  key={id}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* DESKTOP AUTH */}
          <div className="lg:flex items-center hidden">
            <ul className="flex gap-4">
              {isLoggedIn ? (
                <li>
                  <Button onClick={() => onSignOut}>Logout</Button>
                </li>
              ) : (
                <>
                  <li>
                    <Link href="/signup">
                      <Button>Register</Button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/login">
                      <Button>Login</Button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* MOBILE BUTTON */}
          <motion.div
            className="lg:hidden cursor-pointer z-50 flex items-center justify-center"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <HamburgerButton height={48} width={48} isMenuOpen={isMenuOpen} />
          </motion.div>

          {/* MOBILE MENU */}
          {isMenuOpen && (
            <motion.div
              className="absolute right-4 top-16 w-64 rounded-lg bg-gray-900 z-40"
              initial={{ y: '-20%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-20%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <ul className="flex flex-col gap-5 p-6">
                {navItems.map((item, id) => (
                  <li
                    key={id}
                    className="text-white hover:text-gray-300 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}

                <div className="pt-4 border-t border-gray-700">
                  {!isLoggedIn ? (
                    <>
                      <Link href="/signup">
                        <Button className="w-full mb-3">Register</Button>
                      </Link>
                      <Link href="/login">
                        <Button className="w-full">Login</Button>
                      </Link>
                    </>
                  ) : (
                    <Button className="w-full" onClick={() => onSignOut}>
                      Logout
                    </Button>
                  )}
                </div>
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  )
}
