export default function FeaturesGrid() {
  const featureCategories = [
    { name: "dinero", icon: "💳", color: "text-orange-500" },
    { name: "mesas", icon: "🍽️", color: "text-pink-500" },
    { name: "delivery", icon: "🛵", color: "text-purple-500" },
    { name: "e-commerce", icon: "🛍️", color: "text-orange-500" },
    { name: "takeaway", icon: "🥡", color: "text-pink-500" },
    { name: "self-service", icon: "📱", color: "text-orange-500" },
    { name: "stock", icon: "📦", color: "text-pink-500" },
    { name: "facturas", icon: "📄", color: "text-purple-500" },
    { name: "estadísticas", icon: "📊", color: "text-yellow-500" }
  ]

  const detailedFeatures = [
    [
      {
        text: "Adición desde celus de mozos y acceso QR para comensales.",
        borderColor: "border-pink-500"
      },
      {
        text: "Tickets digitales por QR, tanto en mesa como en takeaway.",
        borderColor: "border-yellow-500"
      },
      {
        text: "Comandas digitales en cocina, con notificación de terminadas.",
        borderColor: "border-orange-500"
      },
      {
        text: "Recetas, costos, insumos, compras, y proveedores.",
        borderColor: "border-purple-500"
      }
    ],
    [
      {
        text: "Clientes, cuentas corrientes, y factura A tan sólo indicando cuit.",
        borderColor: "border-pink-500"
      },
      {
        text: "Centralizador online de sucursales, y gestión de franquiciados.",
        borderColor: "border-yellow-500"
      },
      {
        text: "Remitos digitales entre sucursales, y pedidos de reposición a fábrica.",
        borderColor: "border-orange-500"
      },
      {
        text: "Códigos de barra y códigos de balanza, incluso con tu cámara.",
        borderColor: "border-purple-500"
      }
    ],
    [
      {
        text: "Control de presentismo de empleados por QR.",
        borderColor: "border-pink-500"
      },
      {
        text: "Notificaciones con voz sintetizada, y reconocimiento de voz.",
        borderColor: "border-yellow-500"
      },
      {
        text: "Tablets conectadas entre sí por wi-fi interno, incluso sin internet.",
        borderColor: "border-orange-500"
      },
      {
        text: "Controlás todo desde tu celu o compu desde tu casa o donde estés.",
        borderColor: "border-purple-500"
      }
    ]
  ]

  return (
         <section className="py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Con todo lo que necesitás
          </h2>
        </div>

        {/* Categorías de funcionalidades */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20">
          {featureCategories.map((category, index) => (
            <div key={index} className="text-center group">
              <div className={`text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300 ${category.color}`}>
                {category.icon}
              </div>
                             <p className="text-xs sm:text-sm lg:text-base text-neutral-300 font-medium capitalize">
                {category.name}
              </p>
            </div>
          ))}
        </div>

        {/* Descripciones detalladas */}
        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          {detailedFeatures.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {row.map((feature, featureIndex) => (
                <div 
                  key={featureIndex} 
                                     className={`p-4 sm:p-6 lg:p-8 rounded-lg border-2 ${feature.borderColor} bg-neutral-800/50 backdrop-blur-sm hover:bg-neutral-800/70 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg`}
                >
                  <p className="text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 sm:mt-20 lg:mt-24 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white shadow-2xl">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              ¡Todo en una sola plataforma!
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 opacity-90 leading-relaxed">
              Gestión completa para tu negocio gastronómico
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <button className="bg-white text-purple-600 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-lg text-base sm:text-lg lg:text-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50">
                ¡Probalo Ahora!
              </button>
              <button className="border-2 border-white text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-lg text-base sm:text-lg lg:text-xl font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50">
                Solicitar Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
