'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrustBadge } from './TrustBadge'
import { Shield, Star, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

export function WhyChooseUs() {
  const [currentTrustSlide, setCurrentTrustSlide] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Why Choose Weda.lk?</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Your safety and satisfaction are our top priorities. Here's what makes us different.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Card className="border-0 bg-white shadow-lg">
            <CardContent className="p-8 lg:p-12">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Trust & Safety Features</h3>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentTrustSlide((prev) =>
                        prev === 0 ? trustSlides.length - 1 : prev - 1
                      )
                    }
                    className="border-primary/30 text-primary hover:bg-primary/10 h-10 w-10 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentTrustSlide((prev) => (prev + 1) % trustSlides.length)}
                    className="border-primary/30 text-primary hover:bg-primary/10 h-10 w-10 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="relative min-h-[140px] overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentTrustSlide * 100}%)` }}
                >
                  {trustSlides.map((slide, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      {slide.type === 'testimonial' ? (
                        <div className="space-y-4 text-center">
                          <div className="flex justify-center space-x-1">
                            {[...Array(slide.rating)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                            ))}
                          </div>
                          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-900 italic">
                            {slide.description}
                          </p>
                          <p className="text-primary text-base font-medium">— {slide.author}</p>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-6">
                          <div className="flex-shrink-0">
                            {slide.type === 'verification' ? (
                              <TrustBadge type="police_verified" size="lg" />
                            ) : (
                              <div className="bg-primary/10 text-primary flex h-16 w-16 items-center justify-center rounded-full">
                                {slide.icon && <slide.icon className="h-8 w-8" />}
                              </div>
                            )}
                          </div>
                          <div className="text-left">
                            <p className="mb-2 text-xl font-semibold text-gray-900">
                              {slide.title}
                            </p>
                            <p className="text-base text-gray-600">{slide.details}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel indicators */}
              <div className="mt-8 flex justify-center space-x-3">
                {trustSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTrustSlide(index)}
                    className={`h-3 w-3 rounded-full transition-colors ${
                      index === currentTrustSlide ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
