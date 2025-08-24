import Image from 'next/image'

export default function ChefSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      {/* Top white section */}
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-white"></div>
      
      {/* Bottom gradient section */}
      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-r from-violet-500 to-purple-600"></div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          
          {/* Left Side - Text Content on gradient */}
          <div className="text-center lg:text-left relative z-10 lg:mt-20">
            <div className="space-y-8">
              <p className="text-2xl md:text-3xl text-white font-semibold">
                <span className="text-violet-200">+ Simplificamos,</span><br />
                para que nada falle.
              </p>
              <p className="text-2xl md:text-3xl text-white font-semibold">
                <span className="text-violet-200">+ Diseñamos,</span><br />
                para que todo sea fácil.
              </p>
              <p className="text-2xl md:text-3xl text-white font-semibold">
                <span className="text-violet-200">+ Innovamos,</span><br />
                para hacerlo mejor.
              </p>
            </div>
          </div>

          {/* Right Side - Chef Image that overlaps both sections */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <Image
                src="/Assets/interludio.png"
                alt="Chef profesional usando la aplicación"
                width={600}
                height={600}
                className="w-full max-w-md h-auto object-contain relative z-20"
                priority
              />
            </div>
          </div>
        </div>
        
        {/* Main title positioned to overlap both sections */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-30">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Somos la app gastronómica
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-700">
              que querés.
            </span>
          </h2>
        </div>
      </div>
    </section>
  )
}
