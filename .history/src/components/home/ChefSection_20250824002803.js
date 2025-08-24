import Image from 'next/image'

export default function ChefSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      {/* Background with pattern */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-gray-200 to-gray-300"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Text Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
              Somos la app gastronómica
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-700">
                que querés.
              </span>
            </h2>
            
            <div className="space-y-6 mb-8">
              <p className="text-xl text-gray-700">
                <span className="font-semibold text-violet-600">+ Simplificamos,</span><br />
                para que nada falle.
              </p>
              <p className="text-xl text-gray-700">
                <span className="font-semibold text-violet-600">+ Diseñamos,</span><br />
                para que todo sea fácil.
              </p>
              <p className="text-xl text-gray-700">
                <span className="font-semibold text-violet-600">+ Innovamos,</span><br />
                para hacerlo mejor.
              </p>
            </div>
          </div>

          {/* Right Side - Chef Image */}
          <div className="relative">
            <div className="relative">
              <Image
                src="/Assets/interludio.png"
                alt="Chef profesional usando la aplicación"
                width={600}
                height={600}
                className="w-full h-auto object-contain rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
