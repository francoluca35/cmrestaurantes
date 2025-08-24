import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">CM</span>
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900">CM Restaurantes</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#caracteristicas" className="text-gray-600 hover:text-orange-500 transition-colors">Características</a>
            <a href="#modulos" className="text-gray-600 hover:text-orange-500 transition-colors">Módulos</a>
            <a href="#precios" className="text-gray-600 hover:text-orange-500 transition-colors">Precios</a>
            <a href="#contacto" className="text-gray-600 hover:text-orange-500 transition-colors">Contacto</a>
          </nav>
          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-shadow">
            ¡Probar Ahora!
          </button>
        </div>
      </div>
    </header>
  )
}
