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

          {/* Right Content - Device Showcase */}
          <div className="relative">
            <div className="relative flex justify-center items-center">
              {/* Main Tablet (Center) */}
              <div className="relative z-20 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="w-80 h-96 bg-gray-900 rounded-2xl shadow-2xl border-4 border-gray-800 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
                  <div className="absolute top-4 left-4 right-4">
                    <div className="bg-gray-700 rounded-lg p-3">
                      <div className="text-white text-sm font-medium">Mesa 002</div>
                      <div className="text-gray-300 text-xs">admin • 25 jul 17:00</div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-teal-500 text-white rounded-lg p-3 text-center font-semibold">
                      + Adicionar
                    </div>
                  </div>
                </div>
              </div>

              {/* Left Tablet */}
              <div className="absolute left-0 top-10 transform -rotate-6 hover:rotate-0 transition-transform duration-300 z-10">
                <div className="w-64 h-80 bg-gray-900 rounded-2xl shadow-xl border-4 border-gray-800 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
                  <div className="absolute top-4 left-4 right-4">
                    <div className="bg-gray-700 rounded-lg p-2">
                      <div className="text-white text-xs font-medium">Turno Abierto</div>
                      <div className="text-gray-300 text-xs">admin • 25 jul 17:00</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Tablet */}
              <div className="absolute right-0 top-16 transform rotate-6 hover:rotate-0 transition-transform duration-300 z-10">
                <div className="w-64 h-80 bg-gray-900 rounded-2xl shadow-xl border-4 border-gray-800 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
                  <div className="absolute top-4 left-4 right-4">
                    <div className="bg-gray-700 rounded-lg p-2">
                      <div className="text-white text-xs font-medium">Pendientes</div>
                      <div className="text-gray-300 text-xs">Ped 3 • admin</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Smartphone */}
              <div className="absolute -bottom-8 right-8 transform rotate-12 hover:rotate-0 transition-transform duration-300 z-30">
                <div className="w-32 h-48 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl shadow-xl border-4 border-pink-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gray-900 rounded-xl m-1">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                        <div className="w-12 h-12 bg-gray-900 rounded"></div>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-2 right-2 text-center">
                      <div className="text-white text-xs">Control de Pedido</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
