export default function Features() {
  const features = [
    {
      icon: "💰",
      title: "Gestión de Dinero",
      description: "Control total de ingresos, gastos y flujo de caja",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: "🪑",
      title: "Gestión de Mesas",
      description: "Organización eficiente de mesas y reservas",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: "🚚",
      title: "Delivery",
      description: "Integración con plataformas de delivery",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "🛒",
      title: "E-commerce",
      description: "Venta online integrada",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: "📦",
      title: "Takeaway",
      description: "Pedidos para llevar",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: "🖥️",
      title: "Self-Service",
      description: "Kioscos automáticos",
      color: "from-indigo-500 to-purple-500"
    }
  ]

  return (
    <section id="caracteristicas" className="py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Con todo lo que necesitás
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Una solución completa para tu negocio gastronómico. 
            Desde la gestión de mesas hasta el control de inventario, 
            todo en una sola plataforma.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 hover:border-gray-200 h-full">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  <span className="text-2xl sm:text-3xl lg:text-4xl">{feature.icon}</span>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 text-center leading-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed text-sm sm:text-base lg:text-lg">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="mt-16 sm:mt-20 lg:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {[
            { title: 'Stock', icon: '📊', desc: 'Control de inventario' },
            { title: 'Facturas', icon: '🧾', desc: 'Facturación automática' },
            { title: 'Estadísticas', icon: '📈', desc: 'Reportes detallados' },
            { title: 'Recetas', icon: '👨‍🍳', desc: 'Gestión de recetas' }
          ].map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-gray-200 hover:border-pink-300 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg group">
              <div className="text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4 text-center group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 text-center leading-tight">{item.title}</h3>
              <p className="text-gray-600 text-center text-xs sm:text-sm lg:text-base leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
