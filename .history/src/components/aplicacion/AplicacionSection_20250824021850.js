'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

// Custom SVG Icons
const ComputerIcon = () => (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
    <circle cx="12" cy="12" r="1"/>
  </svg>
)

const CablesIcon = () => (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"/>
    <circle cx="6" cy="6" r="1"/>
    <circle cx="18" cy="6" r="1"/>
    <circle cx="6" cy="12" r="1"/>
    <circle cx="18" cy="12" r="1"/>
    <circle cx="6" cy="18" r="1"/>
    <circle cx="18" cy="18" r="1"/>
  </svg>
)

const PrinterIcon = () => (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6V4h12v1z"/>
  </svg>
)

const SlidersIcon = () => (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4 7h16v2H4V7zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"/>
    <circle cx="8" cy="8" r="2"/>
    <circle cx="16" cy="13" r="2"/>
    <circle cx="12" cy="18" r="2"/>
  </svg>
)

const ManualIcon = () => (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
  </svg>
)

const StressIcon = () => (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
)

export default function AplicacionSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Animación para las imágenes - blanco y negro a color
  const imageSaturation = useTransform(
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

  const howWeDoItItems = [
    {
      icon: ComputerIcon,
      text: "Sin reinicios ni actualizaciones constantes"
    },
    {
      icon: CablesIcon,
      text: "Sin cables enredados ni conexiones complejas"
    },
    {
      icon: PrinterIcon,
      text: "Sin impresoras ni papel costoso"
    },
    {
      icon: SlidersIcon,
      text: "Sin configuraciones complicadas"
    },
    {
      icon: ManualIcon,
      text: "Sin manuales ni capacitación extensa"
    },
    {
      icon: StressIcon,
      text: "Sin estrés ni complicaciones"
    }
  ]

  return (
    <section ref={containerRef} className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-neutral-900">
      <div className="w-full">
        {/* Banner horizontal con tres secciones - de punta a punta */}
        <motion.div 
          style={{ scale: imageScale }}
          className="relative w-full h-96 lg:h-[500px] overflow-hidden shadow-2xl"
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
                  <Image
                    src={section.image}
                    alt={section.text.line1}
                    fill
                    className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0"
                    style={{
                      filter: `grayscale(${100 - (imageSaturation.get() * 100)}%)`
                    }}
                  />
                  
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mt-8 sm:mt-10 lg:mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 sm:mb-12">
              ¿Cómo lo hacemos?
            </h3>
            
            {/* Iconos con X roja */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {howWeDoItItems.map((item, index) => (
                <motion.div 
                  key={index}
                  className="relative text-center group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                                     <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-3">
                     <div className="w-full h-full flex items-center justify-center text-white">
                       <item.icon />
                     </div>
                     {/* X roja en círculo */}
                     <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                       <span className="text-white font-bold text-xs">✕</span>
                     </div>
                   </div>
                  <p className="text-sm sm:text-base lg:text-lg text-neutral-300 font-medium leading-tight">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
