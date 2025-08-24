'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function FeaturesGrid() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Animación para los iconos - aparecen en el medio del scroll y desaparecen al final
  const iconOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  )

  // Animación para las descripciones - aparecen después de los iconos
  const descriptionOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.5, 0.8, 1],
    [0, 1, 1, 0]
  )

  // Animación de escala para los iconos
  const iconScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.5, 1, 1, 0.5]
  )

  const featureCategories = [
    { 
      name: "dinero", 
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ), 
      color: "text-orange-500" 
    },
    { 
      name: "mesas", 
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 6h8c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2zm0 2v8h8V8H8z"/>
          <path d="M4 10h2v4H4zm14 0h2v4h-2z"/>
        </svg>
      ), 
      color: "text-pink-500" 
    },
    { 
      name: "delivery", 
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 7c0-1.1-.9-2-2-2h-3v2h3v2.65L13.52 14H10V9H6c-2.21 0-4 1.79-4 4v3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4.48L19 10.35V7zM7 17c-.55 0-1-.45-1-1h2c0 .55-.45 1-1 1z"/>
          <circle cx="7" cy="17" r="2"/>
          <circle cx="17" cy="17" r="2"/>
          <path d="M5 11h14v2H5z"/>
        </svg>
      ), 
      color: "text-purple-500" 
    },
   
    { 
      name: "takeaway", 
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ), 
      color: "text-pink-500" 
    },
    { 
      name: "self-service", 
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
        </svg>
      ), 
      color: "text-orange-500" 
    },
    { 
      name: "stock", 
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
          <path d="M7 12h2v5H7zm4-3h2v8h-2zm4-3h2v11h-2z"/>
        </svg>
      ), 
      color: "text-pink-500" 
    },
    { 
      name: "facturas", 
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
        </svg>
      ), 
      color: "text-purple-500" 
    },
    { 
      name: "estadísticas", 
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
        </svg>
      ), 
      color: "text-yellow-500" 
    }
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
    <section ref={containerRef} className="py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Con todo lo que necesitás
          </h2>
        </div>

        {/* Categorías de funcionalidades */}
        <motion.div 
          style={{ opacity: iconOpacity, scale: iconScale }}
          className="flex justify-center  mb-12 sm:mb-16 lg:mb-20 w-full"
        >
         <div className="grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-8 gap-4 sm:gap-6 max-w-6xl mx-auto place-items-center">

          {featureCategories.map((category, index) => (
            <motion.div 
              key={index} 
              className="text-center group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300 ${category.color}`}>
                {category.icon}
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-neutral-300 font-medium capitalize">
                {category.name}
              </p>
            </motion.div>
          ))}
          </div>
        </motion.div>

        {/* Descripciones detalladas */}
        <motion.div 
          style={{ opacity: descriptionOpacity }}
          className="space-y-6 sm:space-y-8 lg:space-y-10 flex justify-center"
        >
          <div className="max-w-6xl mx-auto w-full">
          {detailedFeatures.map((row, rowIndex) => (
            <motion.div 
              key={rowIndex} 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: rowIndex * 0.2 }}
              viewport={{ once: true }}
            >
              {row.map((feature, featureIndex) => (
                <motion.div 
                  key={featureIndex} 
                  className={`p-4 sm:p-6 lg:p-6 rounded-lg border-2 ${feature.borderColor} bg-neutral-800/50 backdrop-blur-sm hover:bg-neutral-800/70 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <p className="text-sm sm:text-base lg:text-sm text-neutral-200 leading-relaxed">
                    {feature.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          ))}
          </div>
        </motion.div>
     
      </div>
    </section>
  )
}
