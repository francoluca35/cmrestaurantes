import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="w-16 h-16 flex items-center justify-center">
              <Image
                src="/Assets/logo-sletra.png"
                alt="CM Restaurantes Logo"
                width={200}
                height={200}
                className="max-w-md h-full object-contain"
              />
            </div>
            
          </div>
          
          {/* Navigation - Hidden on mobile, visible on tablet and desktop */}
          <nav className="hidden sm:flex space-x-4 md:space-x-8">
            <a href="#caracteristicas" className="text-gray-600 hover:text-orange-500 transition-colors text-sm md:text-base">Características</a>
            <a href="#modulos" className="text-gray-600 hover:text-orange-500 transition-colors text-sm md:text-base">Módulos</a>
            <a href="#precios" className="text-gray-600 hover:text-orange-500 transition-colors text-sm md:text-base">Precios</a>
            <a href="#contacto" className="text-gray-600 hover:text-orange-500 transition-colors text-sm md:text-base">Contacto</a>
          </nav>
          
          {/* Button - Responsive sizing */}
          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg hover:shadow-lg transition-shadow text-sm md:text-base">
            ¡Probar Ahora!
          </button>
        </div>
      </div>
    </header>
  )
}
