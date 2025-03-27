/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'glass': 'rgba(255, 255, 255, 0.15)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'shimmer': 'shimmer 3s infinite linear',
        'slide-in': 'slideIn 0.6s ease-out',
        'shooting-star': 'shootingStar 2s linear forwards',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: 0.8 },
          '50%': { opacity: 0.4 },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        shootingStar: {
          '0%': { transform: 'translateX(-100px) translateY(50px)', opacity: 0 },
          '10%': { opacity: 1 },
          '100%': { transform: 'translateX(100vw) translateY(-100px)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}; 