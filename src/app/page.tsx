import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { PopularServices } from '@/components/PopularServices'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div suppressHydrationWarning className="flex min-h-screen flex-col">
      <Navbar />

      <main className="relative flex-1">
        <div id="unicorn-bg" className="absolute inset-0 z-0 h-full w-full" />

        <div className="relative z-10">
          <Hero />
          <PopularServices />
          <WhyChooseUs />
        </div>
      </main>

      <Footer />
    </div>
  )
}
