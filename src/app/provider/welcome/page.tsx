'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export const dynamic = 'force-dynamic'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Shield,
  Calendar,
  ArrowRight,
  Home,
  Sparkles,
} from 'lucide-react'
import confetti from 'canvas-confetti'
import Image from 'next/image'

export default function ProviderWelcomePage() {
  const router = useRouter()
  const sessionResult = useSession({ required: false })

  // Safe destructuring with fallbacks
  const session = sessionResult?.data || null
  const status = sessionResult?.status || 'loading'

  const [animationStep, setAnimationStep] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Trigger confetti animation
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        clearInterval(interval)
        return
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)

    // Animation sequence
    const animationSequence = [
      () => setAnimationStep(1), // Logo animation
      () => setAnimationStep(2), // Welcome text
      () => setAnimationStep(3), // Success message
      () => setShowContent(true), // Show main content
    ]

    animationSequence.forEach((step, index) => {
      setTimeout(step, (index + 1) * 800)
    })

    return () => clearInterval(interval)
  }, [mounted])

  const benefits = [
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Access to Customers',
      description: 'Connect with verified customers actively seeking your services',
      color: 'text-blue-600',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Trust Badge',
      description: 'Police verification badge increases customer confidence',
      color: 'text-green-600',
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Grow Your Business',
      description: 'Expand your reach and increase your earning potential',
      color: 'text-purple-600',
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: 'Build Reputation',
      description: 'Collect reviews and ratings to showcase your expertise',
      color: 'text-yellow-600',
    },
  ]

  const nextSteps = [
    {
      title: 'Application Under Review',
      description: 'Our team is reviewing your documents and credentials',
      status: 'current',
      time: '2-3 business days',
    },
    {
      title: 'Verification Process',
      description: 'Document and background verification (if required)',
      status: 'pending',
      time: '1-2 business days',
    },
    {
      title: 'Profile Activation',
      description: 'Your profile goes live and you can start receiving bookings',
      status: 'pending',
      time: 'Instant',
    },
  ]

  return (
    <div
      className="from-primary/5 via-secondary/5 to-accent/5 min-h-screen bg-gradient-to-br"
      suppressHydrationWarning
    >
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="bg-primary/10 animate-blob absolute -top-4 -right-4 h-72 w-72 rounded-full opacity-70 mix-blend-multiply blur-xl filter"></div>
        <div className="bg-secondary/10 animate-blob animation-delay-2000 absolute -bottom-8 -left-4 h-72 w-72 rounded-full opacity-70 mix-blend-multiply blur-xl filter"></div>
        <div className="bg-accent/10 animate-blob animation-delay-4000 absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 transform rounded-full opacity-70 mix-blend-multiply blur-xl filter"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Welcome Animation Section */}
        <div className="mb-16 text-center">
          {/* Logo Animation */}
          <div
            className={`mb-8 transition-all duration-1000 ${animationStep >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
          >
            <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full shadow-lg">
              <Image
                src="/logo.png"
                alt="වැඩ.lk Logo"
                width={96}
                height={96}
                className="rounded-full"
              />
            </div>
          </div>

          {/* Welcome Text Animation */}
          <div
            className={`transition-all delay-300 duration-1000 ${animationStep >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          >
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-6xl">
              Welcome to the
              <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
                {' '}
                Weda.lk{' '}
              </span>
              Family!
            </h1>
          </div>

          {/* Success Message Animation */}
          <div
            className={`transition-all delay-600 duration-1000 ${animationStep >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          >
            <div className="mb-6 inline-flex items-center rounded-full bg-green-100 px-6 py-3 text-green-800">
              <CheckCircle className="mr-2 h-5 w-5" />
              <span className="font-semibold">Application Submitted Successfully!</span>
            </div>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Thank you for choosing to become a verified service provider. You're one step closer
              to growing your business with Sri Lanka's most trusted home services platform.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`transition-all duration-1000 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          {/* What's Next Section */}
          <Card className="mb-12 border-0 bg-white/80 shadow-xl backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
                What Happens Next?
              </h2>

              <div className="space-y-6">
                {nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                        step.status === 'current'
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step.status === 'current' ? (
                        <div className="h-3 w-3 animate-pulse rounded-full bg-white"></div>
                      ) : (
                        <span className="text-sm font-bold">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{step.title}</h3>
                        <Badge variant={step.status === 'current' ? 'default' : 'outline'}>
                          {step.time}
                        </Badge>
                      </div>
                      <p className="mt-1 text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Benefits Grid */}
          <div className="mb-12">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
              What You'll Get as a Weda.lk Provider
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="border-0 bg-white/80 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <CardContent className="p-6">
                    <div
                      className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 ${benefit.color}`}
                    >
                      {benefit.icon}
                    </div>
                    <h3 className="mb-2 font-semibold text-gray-900">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Important Information */}
          <Card className="mb-12 border-l-4 border-l-yellow-400 bg-yellow-50/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="mb-3 font-semibold text-gray-900">📧 Important: Check Your Email!</h3>
              <p className="text-gray-700">
                We've sent you a confirmation email with important information about your
                application. Please check your inbox (and spam folder) for next steps and updates on
                your verification process.
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4 text-center sm:flex sm:justify-center sm:space-y-0 sm:space-x-4">
            <Button
              size="lg"
              onClick={() => router.push('/provider/dashboard')}
              className="bg-primary hover:bg-primary/90 text-white shadow-lg"
            >
              <Calendar className="mr-2 h-5 w-5" />
              View Application Status
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push('/en')}
              className="border-2 hover:bg-gray-50"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </div>

          {/* Support Information */}
          <div className="mt-12 rounded-xl bg-gray-50/80 p-6 text-center backdrop-blur-sm">
            <h3 className="mb-2 font-semibold text-gray-900">Need Help?</h3>
            <p className="mb-4 text-gray-600">
              Our support team is here to help you through the onboarding process.
            </p>
            <div className="flex flex-col items-center justify-center space-y-2 text-sm text-gray-600 sm:flex-row sm:space-y-0 sm:space-x-6">
              <span>📧 support@weda.lk</span>
              <span>📞 +94 77 123 4567</span>
              <span>⏰ Mon-Fri 9AM-6PM</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
