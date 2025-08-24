import Image from 'next/image'
import Hero from '@/components/home/Hero'
import Navbar from '@/components/layout/Navbar'
import ChefSection from '@/components/home/ChefSection'
import AplicacionSection from '@/components/aplicacion/AplicacionSection'
import FeaturesGrid from '@/components/Funcionalidades/FeaturesGrid'

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
      </div>
    </main>
  )
}
