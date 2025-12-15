'use client'

import { NavbarProps } from '@/types/Navbar.types'
import Link from 'next/link'
import Button from './Button'
import HamburgerButton from './MenuButton'
import { useState } from 'react'
import { motion } from 'motion/react'

const navItems: String[] = ['Home', 'Events', 'Guests','Committees', 'Team','contactUs']

export default function Navbar({ isLoggedIn = false, onSignOut }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  return (
    <nav className="relative bg-gray-900 shadow-lg ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center h-16 ">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-white z-35">
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
                    <Link href={`/${item.toLowerCase()}`}>{item}</Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="lg:flex items-center hidden">
            <ul className="flex w-full justify-between gap-5">
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
            </ul>
          </div>
          <motion.div
            className="lg:hidden cursor-pointer z-50 flex items-center justify-center"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <HamburgerButton height={60} width={60} />
          </motion.div>
          {isMenuOpen && (
            <motion.div
              className="absolute right-0 top-0 w-64 rounded-lg bg-gray-900 pt-20 "
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
                    >
                      <Link href={`/${item.toLowerCase()}`}>{item}</Link>
                    </li>
                  )
                })}
                {isLoggedIn ? (
                  <li className="pt-4 border-t border-gray-700">
                    <Link href="/">
                      <Button className="w-full mb-3">Logout</Button>
                    </Link>
                  </li>
                ) : (
                  <>
                    <li className="pt-4 border-t border-gray-700">
                      <Link href="/">
                        <Button className="w-full mb-3">Register</Button>
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        <Button className="w-full">Login</Button>
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
