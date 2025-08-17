import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { BecomeProviderContent } from '@/components/BecomeProviderContent'

export default function BecomeProviderPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <BecomeProviderContent />
      <Footer />
    </div>
  )
}
