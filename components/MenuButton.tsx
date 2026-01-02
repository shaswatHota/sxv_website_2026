'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

type hamburgerProps = {
  height?: number
  width?: number
  isMenuOpen:boolean
}

export default function HamburgerButton({
  height = 80,
  width = 80,
  isMenuOpen
}: hamburgerProps) {
  const [active, setActive] = useState<boolean>(false)
  useEffect(() =>{
    setActive(isMenuOpen)
  },[isMenuOpen])
  return (
    <motion.button
      style={{ height: `${height}px`, width: `${width}px` }}
      className="relative rounded-xl bg-gray-900/0 hover:bg-gray/30 transition-colors flex justify-center items-center z-10"
      onClick={() => setActive((prev: boolean) => !prev)}
      animate={active ? 'open' : 'closed'}
    >
      <motion.span
        className="absolute w-[50%] h-1 rounded-xl bg-white -translate-y-2.5"
        variants={{
          open: {
            rotate: '45deg',
            y: 10,
          },
          closed: {
            rotate: '0deg',
          },
        }}
      ></motion.span>
      <motion.span
        className="absolute w-[50%] h-1 rounded-xl bg-white"
        variants={{
          open: {
            opacity: 0,
          },
          closed: {
            opacity: 1,
          },
        }}
      ></motion.span>
      <motion.span
        className="absolute w-[50%] h-1 rounded-xl bg-white translate-y-2.5"
        variants={{
          open: {
            rotate: '-45deg',
            y: -10,
          },
          closed: {
            rotate: '0deg',
          },
        }}
      ></motion.span>
    </motion.button>
  )
}
