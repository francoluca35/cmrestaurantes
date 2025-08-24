import Image from 'next/image'

export default function Hero() {
  return (
    <div>
    <section className="relative py-20 px-4 -z-10 sm:px-6 lg:px-8 bg-gradient-to-br from-violet-950 to-gray-700">
      <div className="max-w-7xl mx-auto">
        {/* Layout responsive */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Imagen arriba en mobile/tablet, derecha en desktop */}
          <div className="order-1 lg:order-2 flex justify-center items-center w-full">
            <div className="relative z-20 w-full flex justify-center">
              
              {/* Imagen para Tablet/Mobile - Hidden en Desktop */}
              <Image
                src="/Assets/FONDOOFICIAL.png"
                alt="Pantalla principal del sistema"
                width={800}
                height={800}
                className="w-full sm:w-full lg:hidden h-auto object-contain"
                priority
              />
              
              {/* Imagen para Desktop - Hidden en Tablet/Mobile */}
              <Image
                src="/Assets/FONDOOFICIAL.png"
                alt="Pantalla principal del sistema"
                width={800}
                height={800}
                className="hidden lg:block  max-w-[4000px] h-auto object-contain"
                priority
              />
              
            </div>
          </div>

          {/* Texto abajo en mobile/tablet, izquierda en desktop */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-200 mb-6 leading-tight">
            hacemos que tus clientes vean la
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-purple-400">
             
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-purple-400">
             velocidad de tu atención.
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
              <button className="bg-gradient-to-r from-cyan-900 to-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                ¡Probalo Ahora!
              </button>
              <button className="border-2 border-cyan-500 text-cyan-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors">
                Ver Demo
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
    <section className="relative z-50 overflow-hidden h-[400px]">
      {/* Fondo con gradiente + imagen */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 bg-cover bg-center"
        style={{ backgroundImage: "url('/Assets/fondo-interludio.png')" }} // 👈 ruta de tu imagen
      ></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Texto */}
          <div className="text-white text-center lg:text-left space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              + <span className="text-white">Simplificamos,</span><br />
              <span className="font-normal">para que nada falle.</span>
            </h2>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              + <span className="text-white">Diseñamos,</span><br />
              <span className="font-normal">para que todo sea fácil.</span>
            </h2>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              + <span className="text-white">Innovamos,</span><br />
              <span className="font-normal">para hacerlo mejor.</span>
            </h2>
          </div>

          {/* Imagen del chef sobresaliendo */}
          <div className="flex justify-center z-50 lg:justify-end relative">
            <Image
              src="/Assets/interludio.png" 
              alt="Chef usando la app en tablet"
              width={600}
              height={600}
              className="w-auto h-[500px] object-contain drop-shadow-2xl -mt-20" 
              priority
            />
          </div>
        </div>
      </div>
    </section>
    </div>
    
  )
}
