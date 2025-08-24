export default function Benefits() {
  const benefits = [
    {
      icon: "✅",
      title: "Sin instalación",
      description: "Ni equipos complicados",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "✅",
      title: "Sin cables",
      description: "Ni fichas que se aflojan",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "✅",
      title: "Sin impresoras",
      description: "Ni costoso papel",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: "✅",
      title: "Sin configuración",
      description: "Ni pérdidas de tiempo",
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: "✅",
      title: "Sin pantallas difíciles",
      description: "Ni manuales complejos",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: "✅",
      title: "Sin fricción",
      description: "Eliminamos estrés y riesgo",
      color: "from-indigo-500 to-blue-500"
    }
  ]

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            ¿Cómo lo hacemos?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Eliminamos toda fricción, estrés y riesgo. 
            Hacemos que la tecnología sea tu aliada, no tu enemiga.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {benefits.map((benefit, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 hover:border-gray-200 h-full">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  <span className="text-2xl sm:text-3xl lg:text-4xl">{benefit.icon}</span>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 text-center leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed text-sm sm:text-base lg:text-lg">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 sm:mt-20 lg:mt-24 text-center">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white shadow-2xl">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              ¡Nuevo paradigma llegó CM Restaurantes!
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 opacity-90 leading-relaxed">
              La revolución en gestión gastronómica está aquí
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <button className="bg-white text-pink-500 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-lg text-base sm:text-lg lg:text-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50">
                ¡Probalo Ahora!
              </button>
              <button className="border-2 border-white text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-lg text-base sm:text-lg lg:text-xl font-semibold hover:bg-white hover:text-pink-500 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50">
                Suscribite Ya
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
