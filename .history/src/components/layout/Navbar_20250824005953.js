import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-900/95 backdrop-blur-sm shadow-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-24 sm:w-28 md:w-32 h-12 sm:h-14 md:h-16 flex items-center justify-center">
              <Image
                src="/Assets/logo-sletra.png"
                alt="CM Restaurantes Logo"
                width={400}
                height={400}
                className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8 xl:space-x-10">
            <a href="#caracteristicas" className="text-gray-100 hover:text-violet-500 transition-all duration-300 text-sm lg:text-base font-medium relative group">
              Características
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#modulos" className="text-gray-100 hover:text-violet-500 transition-all duration-300 text-sm lg:text-base font-medium relative group">
              Módulos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#precios" className="text-gray-100 hover:text-violet-500 transition-all duration-300 text-sm lg:text-base font-medium relative group">
              Precios
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#contacto" className="text-gray-100 hover:text-violet-500 transition-all duration-300 text-sm lg:text-base font-medium relative group">
              Contacto
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>
          
          {/* Desktop Button */}
          <button className="hidden md:block bg-gradient-to-r from-violet-900 to-cyan-800 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 transform hover:scale-105 text-sm lg:text-base font-semibold">
            ¡Probar Ahora!
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-100 hover:text-violet-500 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="py-4 space-y-4 border-t border-gray-800">
            <a href="#caracteristicas" className="block text-gray-100 hover:text-violet-500 transition-colors duration-300 text-base font-medium py-2" onClick={() => setIsMenuOpen(false)}>
              Características
            </a>
            <a href="#modulos" className="block text-gray-100 hover:text-violet-500 transition-colors duration-300 text-base font-medium py-2" onClick={() => setIsMenuOpen(false)}>
              Módulos
            </a>
            <a href="#precios" className="block text-gray-100 hover:text-violet-500 transition-colors duration-300 text-base font-medium py-2" onClick={() => setIsMenuOpen(false)}>
              Precios
            </a>
            <a href="#contacto" className="block text-gray-100 hover:text-violet-500 transition-colors duration-300 text-base font-medium py-2" onClick={() => setIsMenuOpen(false)}>
              Contacto
            </a>
            <button className="w-full bg-gradient-to-r from-violet-900 to-cyan-800 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-base font-semibold">
              ¡Probar Ahora!
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
