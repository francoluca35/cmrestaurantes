import Image from "next/image"

export default function ChefSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Texto */}
          <div className="text-white text-center lg:text-left space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              + <span className="text-white">Simplificamos,</span><br />
              <span className="font-normal">para que nada falle.</span>
            </h2>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              + <span className="text-white">Diseñamos,</span><br />
              <span className="font-normal">para que todo sea fácil.</span>
            </h2>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              + <span className="text-white">Innovamos,</span><br />
              <span className="font-normal">para hacerlo mejor.</span>
            </h2>
          </div>

          {/* Imagen (chef o tablet) */}
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/Assets/interludio.png" // 👉 cambiá esta ruta por la imagen que quieras
              alt="Chef usando la app en tablet"
              width={600}
              height={600}
              className="w-auto h-[500px] object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
