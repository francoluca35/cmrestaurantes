import Image from "next/image"

export default function ChefSection() {
  return (
    <section className="relative overflow-visible h-[400px] ">
      {/* Fondo con gradiente + imagen */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "linear-gradient(to right, rgba(236, 72, 153, 0.8), rgba(244, 63, 94, 0.8)), url('/Assets/fondo-interludio.png')"
        }}
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

          {/* Imagen del chef sobresaliendo sobre el Hero */}
          <div className="flex justify-center lg:justify-end relative">
            <div className="relative z-50 mt-[10px]">
              <Image
                src="/Assets/interludio.png" 
                alt="Chef usando la app en tablet"
                width={600}
                height={600}
                className="w-auto h-[500px] object-contain drop-shadow-2xl" 
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
