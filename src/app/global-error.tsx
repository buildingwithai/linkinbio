'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html>
      <body className="min-h-screen bg-[#010108] text-white flex items-center justify-center">
        <div className="bg-[#0a0a20] bg-opacity-30 backdrop-blur-md rounded-xl p-6 border border-[#2a2a50] w-[90%] max-w-md text-center">
          <h2 className="text-xl font-bold mb-4 text-blue-300">Something went wrong</h2>
          <p className="mb-4 text-blue-100">We encountered a critical error while loading your page.</p>
          <button
            onClick={reset}
            className="py-2 px-4 bg-[#1a1a40] hover:bg-[#2a2a60] transition-colors rounded-md text-center border border-[#3a3a80]"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
} 