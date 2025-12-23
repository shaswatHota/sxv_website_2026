/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cyber-black': '#050202',
        'cyber-dark': '#0a0505',
        'shrine-red': '#a61818',
        'blood-red': '#5c0a0a',
        'rust-brown': '#8c6a5d',
        'paper-white': '#e6e6e6',
        'ghost-white': '#f8f8ff',
      },
      fontFamily: {
        'cyber': ['Orbitron', 'sans-serif'],
        'jp': ['Shojumaru', 'system-ui', 'serif'],
        'tech': ['Rajdhani', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #2b1111 1px, transparent 1px), linear-gradient(to bottom, #2b1111 1px, transparent 1px)",
      },
      animation: {
        'glitch-anim': 'glitch-anim 5s infinite linear alternate-reverse',
        'glitch-anim2': 'glitch-anim2 5s infinite linear alternate-reverse',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'glitch-anim': {
          '0%': { clip: 'rect(35px, 9999px, 11px, 0)' },
          '20%': { clip: 'rect(68px, 9999px, 96px, 0)' },
          '40%': { clip: 'rect(15px, 9999px, 83px, 0)' },
          '60%': { clip: 'rect(2px, 9999px, 34px, 0)' },
          '80%': { clip: 'rect(59px, 9999px, 6px, 0)' },
          '100%': { clip: 'rect(93px, 9999px, 47px, 0)' },
        },
        'glitch-anim2': {
          '0%': { clip: 'rect(85px, 9999px, 36px, 0)' },
          '20%': { clip: 'rect(23px, 9999px, 2px, 0)' },
          '40%': { clip: 'rect(61px, 9999px, 91px, 0)' },
          '60%': { clip: 'rect(5px, 9999px, 73px, 0)' },
          '80%': { clip: 'rect(78px, 9999px, 14px, 0)' },
          '100%': { clip: 'rect(34px, 9999px, 55px, 0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}