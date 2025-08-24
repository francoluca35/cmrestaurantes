import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="w-32 h-16 flex items-center justify-center">
              <Image
                src="/Assets/logo-sletra.png"
                alt="CM Restaurantes Logo"
                width={400}
                height={400}
                className="w-full h-full object-contain"
              />
            </div>
            
          </div>
          
          {/* Navigation - Hidden on mobile, visible on tablet and desktop */}
       
          
          {/* Button - Responsive sizing */}
          <button className="bg-gradient-to-r from-violet-900 to-cyan-800 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg hover:shadow-lg transition-shadow text-sm md:text-base">
            ¡Probar Ahora!
          </button>
        </div>
      </div>
    </header>
  )
}
