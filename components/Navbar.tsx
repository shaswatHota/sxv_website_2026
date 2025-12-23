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
    <nav className="relative bg-gray-900 shadow-lg ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center h-16 ">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-white z-55">
              SamaveshXVassaunt
            </div>
          </Link>
          <div className="lg:flex items-center hidden">
            <ul className="flex w-full justify-between gap-5">
              {navItems.map((item, id) => {
                return (
                  <li
                    key={id}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    <Link href={`${item.href}`}>{item.label}</Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="lg:flex items-center hidden">
            <ul className="flex w-full justify-between gap-5">
              {isLoggedIn ? (
                <li>
                  <Link href="/signup">
                    <Button onClick={() => onSignOut}>Logout</Button>
                  </Link>
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
                      <Button>login</Button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <motion.div
            className="lg:hidden cursor-pointer z-60 flex items-center justify-center"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <HamburgerButton height={60} width={60} isMenuOpen={isMenuOpen} />
          </motion.div>
          {isMenuOpen && (
            <motion.div
              className="absolute right-0 top-0 w-64 rounded-lg bg-gray-900 pt-20 z-50 "
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <ul className="flex flex-col w-full gap-5 p-6">
                {navItems.map((item, id) => {
                  return (
                    <li
                      key={id}
                      className="text-white hover:text-gray-300 transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false)
                      }}
                    >
                      <Link href={`${item.href}`}>{item.label}</Link>
                    </li>
                  )
                })}
                {isLoggedIn ? (
                  <li className="pt-4 border-t border-gray-700">
                    <Link href="/">
                      <Button className="w-full mb-3" onClick={() => onSignOut}>
                        Logout
                      </Button>
                    </Link>
                  </li>
                ) : (
                  <>
                    <li className="pt-4 border-t border-gray-700">
                      <Link href="/signup">
                        <Button
                          className="w-full mb-3"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Register
                        </Button>
                      </Link>
                    </li>
                    <li>
                      <Link href="/login">
                        <Button
                          className="w-full"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Login
                        </Button>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  )
}
