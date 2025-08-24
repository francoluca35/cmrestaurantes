import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-violet-950 to-gray-700">
      <div className="max-w-7xl mx-auto">
        {/* Layout responsive */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Imagen arriba en mobile/tablet, derecha en desktop */}
          <div className="order-1 lg:order-2 flex justify-center items-center w-full">
            <div className="relative z-20 w-full flex justify-center">
              <Image
                src="/Assets/FONDOOFICIAL.png"
                alt="Pantalla principal del sistema"
                width={800}
                height={800}
                className=" w-full md:max-w-[1500px] h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Texto abajo en mobile/tablet, izquierda en desktop */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-200 mb-6 leading-tight">
              Somos la app gastronómica
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-purple-400">
                que querés.
              </span>
            </h1>
            
            <div className="space-y-4 mb-8">
              <p className="text-lg md:text-xl text-gray-100">
                <span className="font-semibold text-cyan-500">+ Simplificamos,</span><br />
                para que nada falle.
              </p>
              <p className="text-lg md:text-xl text-gray-100">
                <span className="font-semibold text-cyan-500">+ Diseñamos,</span><br />
                para que todo sea fácil.
              </p>
              <p className="text-lg md:text-xl text-gray-100">
                <span className="font-semibold text-cyan-500">+ Innovamos,</span><br />
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

        </div>
      </div>
    </section>
  )
}
