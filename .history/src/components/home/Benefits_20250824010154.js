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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ¿Cómo lo hacemos?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Eliminamos toda fricción, estrés y riesgo. 
            Hacemos que la tecnología sea tu aliada, no tu enemiga.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className={`w-20 h-20 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-4xl">{benefit.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              ¡Nuevo paradigma llegó CM Restaurantes!
            </h3>
            <p className="text-xl mb-6 opacity-90">
              La revolución en gestión gastronómica está aquí
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-pink-500 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                ¡Probalo Ahora!
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-pink-500 transition-colors">
                Suscribite Ya
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
