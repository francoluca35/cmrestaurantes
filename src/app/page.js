import Image from 'next/image'
import Hero from '@/components/home/Hero'
import Navbar from '@/components/layout/Navbar'

export default function Home() {
  return (
    <main className="min-h-screen bg-white pt-20">
      <Navbar />
      
      <div className="relative">
        {/* Hero Section */}
        <Hero />
      </div>
    </main>
  )
}
