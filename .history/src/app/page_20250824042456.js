import Image from 'next/image'
import Hero from '@/components/home/Hero'
import Navbar from '@/components/layout/Navbar'
import ChefSection from '@/components/home/ChefSection'
import AplicacionSection from '@/components/aplicacion/AplicacionSection'
import FeaturesGrid from '@/components/Funcionalidades/FeaturesGrid'
import PrecioSection from '@/components/precio/PrecioSection'
import Contador from '@/components/Contador'
import Contacto from '@/components/Contacto'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="relative">
        {/* Hero Section */}
        <Hero />
        
        {/* Chef Section */}
        <ChefSection />
        
        {/* Features Grid Section */}
        <FeaturesGrid />
        
        {/* Aplicacion Section */}
        <AplicacionSection />
        
        {/* Precio Section */}
        <PrecioSection />     
        {/* Contador Section */}
        <Contador />
        {/* Contacto Section */}
        <Contacto />
      </div>
    </main>
  )
}
