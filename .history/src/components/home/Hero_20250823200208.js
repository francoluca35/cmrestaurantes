import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-amber-50">
      <div className="max-w-7xl mx-auto">
        {/* Device Showcase - Solo imágenes */}
        <div className="relative flex justify-center items-center">
          <div className="relative flex justify-center items-center">
            {/* Main Tablet (Center) - pantalla3.png */}
            <div className="relative z-20 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="w-96 h-[500px] bg-gray-900 rounded-3xl shadow-2xl border-4 border-gray-800 relative overflow-hidden">
                <img
                  src="/Assets/pantalla3.png"
                  alt="Pantalla principal del sistema"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>

            {/* Left Tablet - pantalla1.png */}
            <div className="absolute -left-20 top-16 transform -rotate-8 hover:rotate-0 transition-transform duration-300 z-10">
              <div className="w-80 h-96 bg-gray-900 rounded-3xl shadow-xl border-4 border-gray-800 relative overflow-hidden">
                <img
                  src="/Assets/pantalla1.png"
                  alt="Dashboard de gestión"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>

            {/* Right Tablet - pantalla2.png */}
            <div className="absolute -right-20 top-20 transform rotate-8 hover:rotate-0 transition-transform duration-300 z-10">
              <div className="w-80 h-96 bg-gray-900 rounded-3xl shadow-xl border-4 border-gray-800 relative overflow-hidden">
                <img
                  src="/Assets/pantalla2.png"
                  alt="Sistema de cocina"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>

            {/* Smartphone - Gestión de mesas restaurante móvil.png */}
            <div className="absolute -bottom-12 right-12 transform rotate-15 hover:rotate-0 transition-transform duration-300 z-30">
              <div className="w-40 h-56 bg-gradient-to-br from-pink-400 to-purple-500 rounded-3xl shadow-xl border-4 border-pink-300 relative overflow-hidden">
                <img
                  src="/Assets/Gestión de mesas restaurante móvil.png"
                  alt="App móvil de gestión"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Logo Oficial centrado */}
        <div className="flex justify-center mt-16">
          <img
            src="/Assets/logooficial.png"
            alt="Logo Oficial"
            className="max-w-md h-auto"
          />
        </div>
      </div>
    </section>
  )
}
