import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import Benefits from '@/components/home/Benefits'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <Benefits />
    </div>
  )
}
