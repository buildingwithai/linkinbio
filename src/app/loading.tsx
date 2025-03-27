export default function Loading() {
  return (
    <div className="min-h-screen bg-transparent text-white flex items-center justify-center">
      <div className="glassmorphic rounded-xl p-6 border border-[#2a2a50] w-[90%] max-w-md text-center" 
        style={{ 
          background: 'rgba(13, 16, 45, 0.3)',
          boxShadow: 'none'
        }}>
        <div className="w-16 h-16 mx-auto bg-transparent rounded-full mb-4 flex items-center justify-center">
          <span className="text-3xl animate-bounce">👶</span>
        </div>
        <h2 className="text-lg font-bold mb-3 text-blue-300">Loading content...</h2>
        <div className="flex justify-center space-x-2 mt-3">
          <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  )
} 