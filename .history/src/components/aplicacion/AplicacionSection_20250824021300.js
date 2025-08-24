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

  // Animación para las imágenes - blanco y negro a color
  const imageOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 1]
  )

  // Animación de escala para las imágenes
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1, 0.8]
  )

  const problemSections = [
    {
      image: "/Assets/tickets_restaurant.jpg",
      overlayColor: "bg-pink-600/80",
      text: {
        line1: "SIN PAPELITOS",
        line2: "NI BIROMES"
      },
      description: "Elimina el papel y las biromes tradicionales"
    },
    {
      image: "/Assets/instalacion.jpg", 
      overlayColor: "bg-orange-500/80",
      text: {
        line1: "SIN CUELGUES",
        line2: "NI IMPREVISTOS"
      },
      description: "Sin crashes ni problemas técnicos"
    },
    {
      image: "/Assets/faciluso.jpg",
      overlayColor: "bg-yellow-500/80", 
      text: {
        line1: "SIN ENREDOS",
        line2: "NI FALLOS"
      },
      description: "Sin complicaciones ni errores"
    }
  ]

  return (
    <section ref={containerRef} className="py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
     

        {/* Banner horizontal con tres secciones */}
        <motion.div 
          style={{ scale: imageScale }}
          className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="flex h-full">
            {problemSections.map((section, index) => (
              <motion.div 
                key={index}
                className="relative flex-1 group"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Imagen de fondo */}
                <div className="relative w-full h-full">
                  <motion.div
                    style={{
                      filter: useTransform(imageSaturation, (value) => `grayscale(${100 - (value * 100)}%)`)
                    }}
                    className="w-full h-full"
                  >
                    <Image
                      src={section.image}
                      alt={section.text.line1}
                      fill
                      className="object-cover transition-all duration-700"
                    />
                  </motion.div>
                  
                  {/* Overlay de color */}
                  <div className={`absolute inset-0 ${section.overlayColor} transition-opacity duration-500`} />
                  
                  {/* Texto superpuesto */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 lg:p-8">
                    <div className="space-y-2 lg:space-y-4">
                      <h3 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
                        {section.text.line1}
                      </h3>
                      <h3 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
                        {section.text.line2}
                      </h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sección "¿Cómo lo hacemos?" */}
        <motion.div 
          className="text-center mt-16 sm:mt-20 lg:mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-12 sm:mb-16">
            ¿Cómo lo hacemos?
          </h3>
          
          {/* Iconos con X */}
          <div className="flex flex-wrap justify-center gap-8 lg:gap-12 max-w-6xl mx-auto">
            {[
              { icon: "🖥️", name: "Sin reinicios" },
              { icon: "🔌", name: "Sin cables" },
              { icon: "🖨️", name: "Sin impresoras" },
              { icon: "⚙️", name: "Sin configuraciones" },
              { icon: "📖", name: "Sin manuales" },
              { icon: "💡", name: "Sin complicaciones" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="relative text-center group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-3">
                  <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl">
                    {item.icon}
                  </div>
                  {/* X roja */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">✕</span>
                  </div>
                </div>
                <p className="text-sm sm:text-base lg:text-lg text-neutral-300 font-medium">
                  {item.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
