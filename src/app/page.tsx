import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import Pricing from "@/components/Pricing"
import Testimonials from "@/components/Testimonials"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="relative">
        <div 
          id="unicorn-bg" 
          className="absolute inset-0 w-full h-full z-0"
        />
        
        <div className="relative z-10">
          <div className="h-screen">
            <Hero />
          </div>
          
          {/* New sections below the hero */}
          <Pricing />
          <Testimonials />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
