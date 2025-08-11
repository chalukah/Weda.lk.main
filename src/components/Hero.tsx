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

export function Hero() {
  const [showSearch, setShowSearch] = useState(false)
  const [currentTrustSlide, setCurrentTrustSlide] = useState(0)

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
    const interval = setInterval(() => {
      setCurrentTrustSlide((prev) => (prev + 1) % trustSlides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [trustSlides.length])

  return (
    <section className="from-primary via-secondary to-accent relative min-h-screen bg-gradient-to-br">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />

      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        <div className="grid min-h-[80vh] items-center gap-12 lg:grid-cols-2">
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            {/* Trust Badge */}
            <div className="animate-trust-badge inline-flex items-center space-x-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
              <Shield className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">
                Police-Verified Service Providers
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl leading-tight font-bold text-white md:text-5xl lg:text-6xl">
                Trusted Home
                <br />
                Services in
                <br />
                <span className="text-yellow-300">Sri Lanka</span>
              </h1>
              <p className="max-w-xl text-lg text-white/90 md:text-xl">
                Connect with <span className="font-semibold text-yellow-300">police-verified</span>,
                skilled service providers for all your home maintenance needs.{' '}
                <span className="font-semibold text-yellow-300">
                  Safe, reliable, and transparent
                </span>{' '}
                pricing.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="text-primary bg-white px-8 py-4 text-lg font-semibold hover:bg-white/90"
                onClick={() => setShowSearch(true)}
              >
                <Search className="mr-2 h-5 w-5" />
                Find Services
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white/10"
              >
                Join as Provider
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Trust Statistics */}
            <div className="grid grid-cols-2 gap-4 pt-4 md:grid-cols-4">
              {trustStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center">
                    <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.label}</div>
                    <div className="text-xs text-white/70">{stat.description}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column - Service Categories & Search */}
          <div className="space-y-6">
            {showSearch ? (
              <Card className="bg-white backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-gray-900 font-semibold">Find Your Service</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSearch(false)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      ×
                    </Button>
                  </div>
                  <ServiceSearch />
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Popular Services */}
                <Card className="bg-white backdrop-blur-sm shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-gray-900 font-semibold">Popular Services</h3>
                      <Badge variant="secondary" className="bg-primary/20 text-primary font-medium">
                        Most Requested
                      </Badge>
                    </div>

                    <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {serviceCategories.map((category, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            // Show search with the selected category
                            setShowSearch(true)
                            // In a real app, this would filter by category
                            // eslint-disable-next-line no-console
                            console.log('Selected category:', category.name)
                          }}
                          className="border-gray-200 hover:border-primary hover:bg-primary/10 hover-lift flex min-h-[48px] items-center space-x-3 rounded-lg border-2 p-4 transition-all duration-200 hover:scale-105 bg-white"
                        >
                          <span className="text-2xl">{category.icon}</span>
                          <div className="text-left">
                            <div className="text-gray-900 font-semibold text-sm">{category.name}</div>
                            {category.popular && (
                              <Badge variant="outline" className="mt-1 text-xs border-primary/50 text-primary">
                                Popular
                              </Badge>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    <Button className="w-full" onClick={() => setShowSearch(true)}>
                      <Search className="mr-2 h-4 w-4" />
                      Search All Services
                    </Button>
                  </CardContent>
                </Card>

                {/* Trust Indicators Carousel */}
                <Card className="bg-white backdrop-blur-sm shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-gray-900 font-semibold">Why Choose Weda.lk?</h3>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setCurrentTrustSlide((prev) =>
                              prev === 0 ? trustSlides.length - 1 : prev - 1
                            )
                          }
                          className="h-8 w-8 p-0"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setCurrentTrustSlide((prev) => (prev + 1) % trustSlides.length)
                          }
                          className="h-8 w-8 p-0"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="relative overflow-hidden">
                      <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentTrustSlide * 100}%)` }}
                      >
                        {trustSlides.map((slide, index) => (
                          <div key={index} className="w-full flex-shrink-0">
                            {slide.type === 'testimonial' ? (
                              <div className="space-y-3 text-center">
                                <div className="flex justify-center space-x-1">
                                  {[...Array(slide.rating)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className="h-4 w-4 fill-current text-yellow-400"
                                    />
                                  ))}
                                </div>
                                <p className="text-gray-900 text-sm italic">
                                  {slide.description}
                                </p>
                                <p className="text-gray-600 text-xs">— {slide.author}</p>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                  {slide.type === 'verification' ? (
                                    <TrustBadge type="police_verified" size="sm" />
                                  ) : (
                                    <div className="flex h-8 w-8 items-center justify-center rounded bg-green-100 text-green-600">
                                      {slide.icon && <slide.icon className="h-4 w-4" />}
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <p className="text-gray-900 text-sm font-medium">
                                    {slide.title}
                                  </p>
                                  <p className="text-gray-600 text-xs">{slide.details}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Carousel indicators */}
                    <div className="mt-4 flex justify-center space-x-2">
                      {trustSlides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTrustSlide(index)}
                          className={`h-2 w-2 rounded-full transition-colors ${
                            index === currentTrustSlide ? 'bg-primary' : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
