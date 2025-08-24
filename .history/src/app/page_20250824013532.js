import Image from 'next/image'
import Hero from '@/components/home/Hero'
import Navbar from '@/components/layout/Navbar'
import ChefSection from '@/components/home/ChefSection'
import Benefits from '@/components/home/Benefits'
import Features from '@/components/home/Features'
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
      </div>
    </main>
  )
}
