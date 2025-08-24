import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-violet-950 to-gray-700 z-10 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Layout responsive */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* Imagen arriba en mobile, derecha en tablet/desktop */}
          <div className="order-1 md:order-2 flex justify-center items-center w-full">
            <div className="relative z-20 w-full flex justify-center">
              
              {/* Imagen optimizada para todos los dispositivos */}
              <Image
                src="/Assets/FONDOOFICIAL.png"
                alt="Pantalla principal del sistema CM Restaurantes"
                width={800}
                height={800}
                className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] 2xl:max-w-[800px] h-auto object-contain drop-shadow-2xl transition-all duration-500 ease-in-out hover:scale-105"
                priority
                sizes="(max-width: 640px) 300px, (max-width: 768px) 400px, (max-width: 1024px) 500px, (max-width: 1280px) 600px, (max-width: 1536px) 700px, 800px"
              />
              
            </div>
          </div>

          {/* Texto abajo en mobile, izquierda en tablet/desktop */}
          <div className="order-2 md:order-1 text-center md:text-left max-w-2xl md:max-w-none">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-gray-200 mb-6 sm:mb-8 leading-tight">
              hacemos que tus clientes vean la
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-purple-400">
                velocidad de tu atención.
              </span>
            </h1>
            
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 lg:mb-10">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 leading-relaxed">
                <span className="font-semibold text-cyan-500">+ Simplificamos,</span><br />
                para que nada falle.
              </p>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 leading-relaxed">
                <span className="font-semibold text-cyan-500">+ Diseñamos,</span><br />
                para que todo sea fácil.
              </p>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 leading-relaxed">
                <span className="font-semibold text-cyan-500">+ Innovamos,</span><br />
                para hacerlo mejor.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start">
              <button className="bg-gradient-to-r from-cyan-900 to-gray-800 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg text-base sm:text-lg md:text-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500/50">
                ¡Probalo Ahora!
              </button>
              <button className="border-2 border-cyan-500 text-cyan-500 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg text-base sm:text-lg md:text-xl font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-500/50">
                Ver Demo
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
