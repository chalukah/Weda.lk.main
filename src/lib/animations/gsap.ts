import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { SplitText } from 'gsap/SplitText'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText)
}

// GSAP Animation Utilities
export class GSAPAnimations {
  // Hero text animation - split characters and animate up
  static animateHeroText(selector: string, delay: number = 0) {
    if (typeof window === 'undefined') return

    const elements = gsap.utils.toArray(selector)

    elements.forEach((element: any) => {
      const splitText = new SplitText(element, {
        type: 'chars',
        charsClass: 'char',
      })

      // Set initial state
      gsap.set(splitText.chars, {
        y: 50,
        opacity: 0,
        rotationX: -90,
      })

      // Animate characters
      gsap.to(splitText.chars, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: {
          amount: 0.8,
          from: 'start',
        },
        delay: delay,
      })
    })
  }

  // Testimonial cards scroll animation
  static animateTestimonialCards(selector: string = '.testimonial-card') {
    if (typeof window === 'undefined') return

    const cards = gsap.utils.toArray(selector)

    cards.forEach((card: any, index: number) => {
      gsap.set(card, {
        opacity: 0,
        y: 100,
        scale: 0.8,
      })

      ScrollTrigger.create({
        trigger: card as gsap.DOMTarget,
        start: 'top 85%',
        end: 'bottom 15%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            delay: index * 0.1,
          })
        },
        onLeave: () => {
          gsap.to(card, {
            opacity: 0.3,
            duration: 0.3,
          })
        },
        onEnterBack: () => {
          gsap.to(card, {
            opacity: 1,
            duration: 0.3,
          })
        },
      })
    })
  }

  // Generic fade in animation for any element
  static fadeInOnScroll(selector: string, options: any = {}) {
    if (typeof window === 'undefined') return

    const elements = gsap.utils.toArray(selector)

    elements.forEach((element: any) => {
      gsap.set(element, {
        opacity: 0,
        y: options.y || 30,
        x: options.x || 0,
        scale: options.scale || 1,
      })

      ScrollTrigger.create({
        trigger: element as gsap.DOMTarget,
        start: options.start || 'top 80%',
        onEnter: () => {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration: options.duration || 0.8,
            ease: options.ease || 'power2.out',
            delay: options.delay || 0,
          })
        },
      })
    })
  }

  // Stagger animation for multiple elements
  static staggerAnimation(selector: string, options: any = {}) {
    if (typeof window === 'undefined') return

    const elements = gsap.utils.toArray(selector)

    gsap.set(elements, {
      opacity: 0,
      y: options.y || 50,
      x: options.x || 0,
    })

    ScrollTrigger.create({
      trigger: elements[0] as gsap.DOMTarget,
      start: options.start || 'top 80%',
      onEnter: () => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          x: 0,
          duration: options.duration || 0.6,
          ease: options.ease || 'power2.out',
          stagger: options.stagger || 0.1,
        })
      },
    })
  }

  // Refresh ScrollTrigger (useful after dynamic content loads)
  static refresh() {
    if (typeof window !== 'undefined') {
      ScrollTrigger.refresh()
    }
  }

  // Kill all ScrollTriggers (cleanup)
  static killAll() {
    if (typeof window !== 'undefined') {
      ScrollTrigger.killAll()
    }
  }
}

// Export individual functions for easier imports
export const animateHeroText = GSAPAnimations.animateHeroText
export const animateTestimonialCards = GSAPAnimations.animateTestimonialCards
export const fadeInOnScroll = GSAPAnimations.fadeInOnScroll
export const staggerAnimation = GSAPAnimations.staggerAnimation

export default GSAPAnimations
