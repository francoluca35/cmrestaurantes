import Image from "next/image"

export default function ChefSection() {
  return (
    <section className="relative overflow-visible min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[800px] xl:min-h-[900px] 2xl:min-h-[1000px]">
      {/* Fondo con imagen */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/Assets/fondo-interludio.jpg')"
        }}
      ></div>
      
      {/* Gradiente que difumina del color sólido hacia la imagen */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-800 via-violet-800/90 to-gray-800/80"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center w-full">
          
          {/* Lado izquierdo con color sólido */}
          <div className="h-full flex items-center justify-center order-2 lg:order-1 py-8 sm:py-12 lg:py-0">
            <div className="text-white text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8 max-w-lg lg:max-w-none">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight">
                + <span className="text-white">Simplificamos,</span><br />
                <span className="font-normal">para que nada falle.</span>
              </h2>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight">
                + <span className="text-white">Diseñamos,</span><br />
                <span className="font-normal">para que todo sea fácil.</span>
              </h2>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight">
                + <span className="text-white">Innovamos,</span><br />
                <span className="font-normal">para hacerlo mejor.</span>
              </h2>
            </div>
          </div>

          {/* Lado derecho con imagen del chef */}
          <div className="flex justify-center lg:justify-end relative order-1 lg:order-2">
            <div className="relative z-10 -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20 xl:-mt-24 2xl:-mt-32">
              <Image
                src="/Assets/prueba.png" 
                alt="Chef usando la app en tablet"
                width={300}
                height={300}
                className="w-auto h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] object-contain drop-shadow-2xl transition-all duration-300 ease-in-out" 
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
