'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export default function AplicacionSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Animación para el título
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  )

  // Animación para las imágenes
  const imageOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.3, 0.7, 0.9],
    [0, 1, 1, 0]
  )

  // Animación de escala para las imágenes
  const imageScale = useTransform(
    scrollYProgress,
    [0.1, 0.3, 0.7, 0.9],
    [0.8, 1, 1, 0.8]
  )

  const applicationSteps = [
    {
      image: "/Assets/instalacion.jpg",
      title: "Instalación Simple",
      description: "Proceso de instalación rápido y sencillo. Nuestra aplicación se instala en minutos, sin complicaciones técnicas.",
      overlayColor: "bg-blue-600/80"
    },
    {
      image: "/Assets/tickets_restaurant.jpg",
      title: "Gestión de Tickets",
      description: "Sistema completo de tickets digitales. Elimina el papel y optimiza el flujo de trabajo en tu restaurante.",
      overlayColor: "bg-green-600/80"
    },
    {
      image: "/Assets/faciluso.jpg",
      title: "Fácil de Usar",
      description: "Interfaz intuitiva y fácil de usar. Tu equipo aprenderá a usar la aplicación en minutos.",
      overlayColor: "bg-purple-600/80"
    }
  ]

  return (
    <section ref={containerRef} className="py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 bg-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <motion.div 
          style={{ opacity: titleOpacity }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Aplicación Intuitiva y Eficiente
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-neutral-300 max-w-4xl mx-auto">
            Descubre cómo nuestra aplicación revoluciona la gestión de tu restaurante
          </p>
        </motion.div>

        {/* Pasos de la aplicación */}
        <motion.div 
          style={{ opacity: imageOpacity, scale: imageScale }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {applicationSteps.map((step, index) => (
            <motion.div 
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Imagen */}
              <div className="relative h-80 lg:h-96 w-full">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay con gradiente */}
                <div className={`absolute inset-0 ${step.overlayColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Contenido del overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/90 text-sm lg:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Información visible por defecto */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 lg:p-8">
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-white/80 text-sm lg:text-base">
                  {step.description}
                </p>
              </div>

              {/* Indicador de paso */}
              <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {index + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16 sm:mt-20 lg:mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-white/10">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              ¿Listo para transformar tu restaurante?
            </h3>
            <p className="text-neutral-300 text-lg mb-6 max-w-2xl mx-auto">
              Únete a cientos de restaurantes que ya confían en nuestra solución
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              Comenzar Ahora
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
