import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-950 to-gray-700 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Layout responsive */}
        <div className="flex flex-col xl:grid xl:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* Imagen arriba en mobile/tablet, derecha en desktop */}
          <div className="order-1 xl:order-2 flex justify-center items-center w-full">
            <div className="relative z-20 w-full flex justify-center">
              
              {/* Imagen para Tablet/Mobile - Hidden en Desktop */}
              <Image
                src="/Assets/FONDOOFICIAL.png"
                alt="Pantalla principal del sistema"
                width={800}
                height={800}
                className="w-full max-w-[250px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px] xl:hidden h-auto object-contain"
                priority
              />
              
              {/* Imagen para Desktop - Hidden en Tablet/Mobile */}
              <Image
                src="/Assets/FONDOOFICIAL.png"
                alt="Pantalla principal del sistema"
                width={800}
                height={800}
                className="hidden xl:block max-w-[600px] xl:max-w-[700px] 2xl:max-w-[800px] h-auto object-contain"
                priority
              />
              
            </div>
          </div>

          {/* Texto abajo en mobile/tablet, izquierda en desktop */}
          <div className="order-2 xl:order-1 text-center xl:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
              Hacemos que tus clientes
              <span className="block text-purple-400">
                vean la
              </span>
              <span className="block text-white">
                velocidad de tu atención.
              </span>
            </h1>
            
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 md:mb-8">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed">
                <span className="font-semibold text-cyan-500">Tenemos la solución a todos tus problemas.</span><br />
                <span className="text-white">Hace que tu rendimiento sea mas rapido y eficiente.</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center xl:justify-start">
              <button className="bg-gradient-to-r from-cyan-900 to-gray-800 text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg text-sm sm:text-base md:text-lg font-semibold hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                ¡Contactate con nosotros!
              </button>
              <button className="bg-gradient-to-r from-purple-900 to-purple-700 text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg text-sm sm:text-base md:text-lg font-semibold hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                Ver Demo
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
    
  )
}
