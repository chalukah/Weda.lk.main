'use client'

import { useEffect, useRef } from 'react'
import { GSAPAnimations } from './gsap'

// Example Hero Component with GSAP animations
export function AnimatedHero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate hero headline on component mount
    GSAPAnimations.animateHeroText('.hero-headline', 0.5)

    // Animate subtext
    GSAPAnimations.fadeInOnScroll('.hero-subtext', {
      y: 30,
      duration: 1,
      delay: 1.2,
    })

    // Cleanup on unmount
    return () => {
      GSAPAnimations.killAll()
    }
  }, [])

  return (
    <div
      ref={heroRef}
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-white"
    >
      <div className="px-4 text-center">
        <h1 className="hero-headline mb-6 text-6xl font-bold text-gray-900 md:text-8xl">
          Find Your Dream Home
        </h1>
        <p className="hero-subtext mx-auto max-w-2xl text-xl text-gray-600 md:text-2xl">
          Discover the perfect property with Sri Lanka's most innovative real estate platform
        </p>
      </div>
    </div>
  )
}

// Example Testimonials Component with GSAP animations
export function AnimatedTestimonials() {
  const testimonialsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate testimonial cards on scroll
    GSAPAnimations.animateTestimonialCards('.testimonial-card')

    // Animate section title
    GSAPAnimations.staggerAnimation('.testimonial-title', {
      y: 40,
      duration: 0.8,
      stagger: 0.2,
    })

    // Cleanup on unmount
    return () => {
      GSAPAnimations.killAll()
    }
  }, [])

  return (
    <section ref={testimonialsRef} className="bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="testimonial-title mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            What Our Clients Say
          </h2>
          <p className="testimonial-title mx-auto max-w-2xl text-xl text-gray-600">
            Join thousands of real estate professionals who trust Weda.lk
          </p>
        </div>

        {/* Your testimonial cards would go here */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="testimonial-card rounded-lg bg-white p-6 shadow-lg">
              <p className="mb-4 text-gray-700">
                "This platform has transformed our business completely. Amazing results!"
              </p>
              <div className="flex items-center">
                <div className="mr-4 h-12 w-12 rounded-full bg-gray-300"></div>
                <div>
                  <h4 className="font-semibold">Client Name {i}</h4>
                  <p className="text-sm text-gray-600">Company {i}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Example usage in a page component
export function ExamplePage() {
  return (
    <div>
      <AnimatedHero />
      <AnimatedTestimonials />
    </div>
  )
}
