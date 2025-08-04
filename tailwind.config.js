/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Main color palette from GTM Labs
        primary: {
          50: '#F1F6F9',
          100: '#D9E9F2',
          200: '#A3D7F5',
          300: '#6EC5F7',
          400: '#33B4FF',
          500: '#0D9EF2',
          600: '#0580C7',
          700: '#006199',
          800: '#034063',
          900: '#012032',
        },
        // Accent colors (purple/pink for highlights)
        accent: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        // Slate colors for backgrounds
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        'glass': 'rgba(255, 255, 255, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'primary-gradient': 'linear-gradient(135deg, #0D9EF2 0%, #33B4FF 100%)',
        'accent-gradient': 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
        'slate-gradient': 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)',
        'hero-gradient': 'linear-gradient(135deg, #020617 0%, #0f172a 100%)',
        'glow-gradient': 'linear-gradient(135deg, #007cf0 0%, #f81ce5 100%)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'pulse-glow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scale-pulse': 'scale-pulse 6s ease-in-out infinite',
        'gradient-shimmer': 'gradient-shimmer 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite linear',
        'slide-in': 'slideIn 0.6s ease-out',
        'shooting-star': 'shootingStar 2s linear forwards',
      },
      keyframes: {
        'scale-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'gradient-shimmer': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
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