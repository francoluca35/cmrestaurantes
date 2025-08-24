import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Somos la app gastronómica
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                que querés.
              </span>
            </h1>
            
            <div className="space-y-4 mb-8">
              <p className="text-xl text-gray-600">
                <span className="font-semibold text-pink-500">+ Simplificamos,</span><br />
                para que nada falle.
              </p>
              <p className="text-xl text-gray-600">
                <span className="font-semibold text-pink-500">+ Diseñamos,</span><br />
                para que todo sea fácil.
              </p>
              <p className="text-xl text-gray-600">
                <span className="font-semibold text-pink-500">+ Innovamos,</span><br />
                para hacerlo mejor.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                ¡Probalo Ahora!
              </button>
              <button className="border-2 border-pink-500 text-pink-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-pink-50 transition-colors">
                Ver Demo
              </button>
            </div>
          </div>

          {/* Right Content - Device Showcase with Real Images */}
          <div className="relative">
            <div className="relative flex justify-center items-center">
              {/* Main Tablet (Center) - pantalla3.png */}
              <div className="relative z-20 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="w-80 h-96 bg-gray-900 rounded-2xl shadow-2xl border-4 border-gray-800 relative overflow-hidden">
                  <Image
                    src="/Assets/pantalla3.png"
                    alt="Pantalla principal del sistema"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              </div>

              {/* Left Tablet - pantalla1.png */}
              <div className="absolute left-0 top-10 transform -rotate-6 hover:rotate-0 transition-transform duration-300 z-10">
                <div className="w-64 h-80 bg-gray-900 rounded-2xl shadow-xl border-4 border-gray-800 relative overflow-hidden">
                  <Image
                    src="/Assets/pantalla1.png"
                    alt="Dashboard de gestión"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              </div>

              {/* Right Tablet - pantalla2.png */}
              <div className="absolute right-0 top-16 transform rotate-6 hover:rotate-0 transition-transform duration-300 z-10">
                <div className="w-64 h-80 bg-gray-900 rounded-2xl shadow-xl border-4 border-gray-800 relative overflow-hidden">
                  <Image
                    src="/Assets/pantalla2.png"
                    alt="Sistema de cocina"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              </div>

              {/* Smartphone - Gestión de mesas restaurante móvil.png */}
              <div className="absolute -bottom-8 right-8 transform rotate-12 hover:rotate-0 transition-transform duration-300 z-30">
                <div className="w-32 h-48 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl shadow-xl border-4 border-pink-300 relative overflow-hidden">
                  <Image
                    src="/Assets/Gestión de mesas restaurante móvil.png"
                    alt="App móvil de gestión"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
