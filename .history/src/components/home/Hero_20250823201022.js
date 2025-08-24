import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-violet-950 to-gray-700">
      <div className="max-w-7xl mx-auto">
        {/* Image Section - Large and Responsive */}
        <div className="flex justify-center mb-16">
          <div className="relative w-full max-w-4xl">
            <img
              src="/Assets/FONDOOFICIAL.png"
              alt="Pantalla principal del sistema"
              className="w-full h-auto object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>

        {/* Text and Buttons Section - Below Image */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-200 mb-8">
            Somos la app gastronómica
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-purple-400">
              que querés.
            </span>
          </h1>
          
          <div className="space-y-6 mb-12">
            <p className="text-lg sm:text-xl text-gray-100">
              <span className="font-semibold text-cyan-500">+ Simplificamos,</span><br />
              para que nada falle.
            </p>
            <p className="text-lg sm:text-xl text-gray-100">
              <span className="font-semibold text-cyan-500">+ Diseñamos,</span><br />
              para que todo sea fácil.
            </p>
            <p className="text-lg sm:text-xl text-gray-100">
              <span className="font-semibold text-cyan-500">+ Innovamos,</span><br />
              para hacerlo mejor.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              ¡Probalo Ahora!
            </button>
            <button className="border-2 border-pink-500 text-pink-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-pink-50 transition-colors">
              Ver Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
