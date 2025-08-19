'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ServiceSearch } from './ServiceSearch'
import { TrustBadge } from './TrustBadge'
import {
  Shield,
  Star,
  Users,
  CheckCircle,
  Search,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export function Hero() {
  const t = useTranslations('hero')
  const tTrust = useTranslations('trust')
  const tButtons = useTranslations('buttons')
  const [showSearch, setShowSearch] = useState(false)
  const [currentTrustSlide, setCurrentTrustSlide] = useState(0)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const trustStats = [
    { icon: Shield, label: '500+', description: 'Police-Verified Providers' },
    { icon: Star, label: '4.8', description: 'Average Rating' },
    { icon: Users, label: '10,000+', description: 'Happy Customers' },
    { icon: CheckCircle, label: '98%', description: 'Service Success Rate' },
  ]

  const serviceCategories = [
    { name: 'House Cleaning', icon: '🏠', popular: true },
    { name: 'Plumbing', icon: '🔧', popular: true },
    { name: 'Electrical', icon: '⚡', popular: true },
    { name: 'Gardening', icon: '🌱', popular: false },
    { name: 'Painting', icon: '🎨', popular: false },
    { name: 'Carpentry', icon: '🪚', popular: false },
  ]

  const trustSlides = [
    {
      type: 'verification',
      title: 'Police Verification Process',
      description: 'Every provider undergoes thorough police background checks',
      icon: Shield,
      details: 'All providers are background checked',
    },
    {
      type: 'testimonial',
      title: 'Customer Testimonial',
      description: '"Found an excellent plumber through Weda.lk. Professional and trustworthy!"',
      author: 'Priya S., Colombo',
      rating: 5,
    },
    {
      type: 'process',
      title: 'Secure Payment System',
      description: 'Escrow payment held until service completion',
      icon: CheckCircle,
      details: "Payment protected until you're satisfied",
    },
    {
      type: 'testimonial',
      title: 'Provider Success Story',
      description: '"Weda.lk helped me grow my business with verified customers"',
      author: 'Ravi M., Service Provider',
      rating: 5,
    },
  ]

  // Auto-rotate trust slides
  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setCurrentTrustSlide((prev) => (prev + 1) % trustSlides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [trustSlides.length, mounted])

  return (
    <section className="bg-background relative min-h-screen overflow-hidden">
      {/* Hero Image Background - positioned on the right side */}
      <div className="absolute top-0 right-0 hidden h-full w-1/2 lg:block">
        <div className="relative h-full w-full">
          <img
            src="/hero-service-professionals.jpg"
            alt="Professional service providers at work - electrician and technician installing lighting fixtures"
            className="h-full w-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />
          <div className="to-background/20 absolute inset-0 bg-gradient-to-l from-transparent" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        <div className="grid min-h-[80vh] items-center gap-12 lg:grid-cols-2">
          {/* Left Column - Hero Content with Background */}
          <div className="lg:pr-8">
            <div className="from-primary via-secondary to-accent space-y-8 rounded-3xl bg-gradient-to-br p-8 text-white shadow-2xl lg:p-12">
              {/* Trust Badge */}
              <div className="animate-trust-badge inline-flex items-center space-x-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                <Shield className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">
                  {tTrust('securityGuaranteed')}
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-3xl leading-tight font-bold text-white md:text-4xl lg:text-5xl">
                  {t('title')}
                </h1>
                <p className="text-base leading-relaxed text-white/95 md:text-lg">
                  {t('subtitle')}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="text-primary bg-white px-6 py-3 text-base font-semibold shadow-lg hover:bg-gray-100"
                  onClick={() => router.push('/search')}
                >
                  <Search className="mr-2 h-4 w-4" />
                  {t('searchButton')}
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="hover:text-primary border-2 border-white/30 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white"
                  onClick={() => router.push('/become-provider')}
                >
                  {tButtons('joinAsProvider')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Trust Statistics */}
              <div className="grid grid-cols-2 gap-4 pt-4 md:grid-cols-4">
                {trustStats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div key={index} className="text-center">
                      <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-xl font-bold text-white lg:text-2xl">{stat.label}</div>
                      <div className="text-xs text-white/80">{stat.description}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Mobile Image */}
          <div className="lg:hidden">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <div className="relative h-64 w-full">
                <img
                  src="/hero-service-professionals.jpg"
                  alt="Professional service providers at work - electrician and technician installing lighting fixtures"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="from-primary/40 absolute inset-0 bg-gradient-to-t to-transparent" />
                <div className="absolute right-4 bottom-4 left-4">
                  <div className="bg-background/95 rounded-lg p-3 backdrop-blur-sm">
                    <p className="text-foreground text-sm font-medium">
                      {tTrust('trustedProfessionals')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
