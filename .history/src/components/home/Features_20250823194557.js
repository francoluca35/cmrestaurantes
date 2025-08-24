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
    <section id="caracteristicas" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Con todo lo que necesitás
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Una solución completa para tu negocio gastronómico. 
            Desde la gestión de mesas hasta el control de inventario, 
            todo en una sola plataforma.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Stock', icon: '📊', desc: 'Control de inventario' },
            { title: 'Facturas', icon: '🧾', desc: 'Facturación automática' },
            { title: 'Estadísticas', icon: '📈', desc: 'Reportes detallados' },
            { title: 'Recetas', icon: '👨‍🍳', desc: 'Gestión de recetas' }
          ].map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:border-pink-300 transition-colors">
              <div className="text-4xl mb-4 text-center">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{item.title}</h3>
              <p className="text-gray-600 text-center text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
