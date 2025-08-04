# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 personal "Link in Bio" page with a starry night theme, featuring animated components and a modern dark aesthetic. The project uses TypeScript, Tailwind CSS, and Framer Motion for animations.

## Development Commands

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom color palette and animations
- **Animations**: Framer Motion for smooth interactions and scroll effects
- **Icons**: Lucide React
- **Analytics**: Vercel Speed Insights

### Project Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - Reusable React components
- `src/types/` - TypeScript type definitions

### Key Components
- `page.tsx` - Main landing page with hero section and link cards
- `HeroButton.tsx` - Custom animated button component with gradient glow effects
- `layout.tsx` - Root layout with Inter font and Speed Insights

### Design System
- **Colors**: Custom primary (blue) and accent (pink) color palettes defined in `tailwind.config.js`
- **Animations**: Custom keyframes for gradient shimmer, scale pulse, and shooting star effects
- **Theme**: Dark theme with slate-950 backgrounds and gradient overlays

### Key Features
- Responsive grid layout for link cards
- Parallax scrolling effects using Framer Motion
- Hover animations and gradient overlays
- Custom gradient glow buttons
- Featured link cards that span multiple columns

## Development Notes

- Uses "use client" directive for client-side components with animations
- Implements hydration-safe rendering with `isMounted` state
- Custom Tailwind animations defined in config
- Links array in `page.tsx` contains all external links and their metadata