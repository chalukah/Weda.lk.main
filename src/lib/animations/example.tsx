"use client";

import { useEffect, useRef } from "react";
import { GSAPAnimations } from "./gsap";

// Example Hero Component with GSAP animations
export function AnimatedHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate hero headline on component mount
    GSAPAnimations.animateHeroText(".hero-headline", 0.5);
    
    // Animate subtext
    GSAPAnimations.fadeInOnScroll(".hero-subtext", {
      y: 30,
      duration: 1,
      delay: 1.2
    });

    // Cleanup on unmount
    return () => {
      GSAPAnimations.killAll();
    };
  }, []);

  return (
    <div ref={heroRef} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="text-center px-4">
        <h1 className="hero-headline text-6xl md:text-8xl font-bold text-gray-900 mb-6">
          Find Your Dream Home
        </h1>
        <p className="hero-subtext text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
          Discover the perfect property with Sri Lanka's most innovative real estate platform
        </p>
      </div>
    </div>
  );
}

// Example Testimonials Component with GSAP animations
export function AnimatedTestimonials() {
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate testimonial cards on scroll
    GSAPAnimations.animateTestimonialCards(".testimonial-card");
    
    // Animate section title
    GSAPAnimations.staggerAnimation(".testimonial-title", {
      y: 40,
      duration: 0.8,
      stagger: 0.2
    });

    // Cleanup on unmount
    return () => {
      GSAPAnimations.killAll();
    };
  }, []);

  return (
    <section ref={testimonialsRef} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="testimonial-title text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="testimonial-title text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of real estate professionals who trust Weda.lk
          </p>
        </div>
        
        {/* Your testimonial cards would go here */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="testimonial-card bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-700 mb-4">
                "This platform has transformed our business completely. Amazing results!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
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
  );
}

// Example usage in a page component
export function ExamplePage() {
  return (
    <div>
      <AnimatedHero />
      <AnimatedTestimonials />
    </div>
  );
}