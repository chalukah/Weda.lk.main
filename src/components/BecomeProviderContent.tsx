'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import {
  Shield,
  TrendingUp,
  Users,
  CreditCard,
  CheckCircle,
  FileText,
  Camera,
  Calendar,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProviderApplicationForm } from '@/components/ProviderApplicationForm'
import { toast } from 'sonner'

export function BecomeProviderContent() {
  const { data: session, status } = useSession()
  const [showApplicationForm, setShowApplicationForm] = useState(false)

  const benefits = [
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: 'Grow Your Business',
      description: 'Reach thousands of potential customers actively looking for your services.',
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: 'Build Trust',
      description: 'Police verification badge builds customer confidence and increases bookings.',
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: 'Verified Customers',
      description: 'Work with genuine customers who have been verified through our platform.',
    },
    {
      icon: <CreditCard className="h-8 w-8 text-orange-600" />,
      title: 'Secure Payments',
      description: 'Get paid reliably through our secure escrow payment system.',
    },
  ]

  const requirements = [
    {
      icon: <FileText className="text-primary h-6 w-6" />,
      title: 'Valid ID & Business License',
      description: 'National ID card and relevant business/professional licenses',
    },
    {
      icon: <Shield className="text-primary h-6 w-6" />,
      title: 'Police Clearance',
      description: 'Recent police clearance certificate (within 6 months)',
    },
    {
      icon: <Camera className="text-primary h-6 w-6" />,
      title: 'Portfolio & References',
      description: 'Work samples and at least 2 professional references',
    },
    {
      icon: <CheckCircle className="text-primary h-6 w-6" />,
      title: 'Skills Assessment',
      description: 'Complete our skills verification process for your service category',
    },
  ]

  const onboardingSteps = [
    {
      step: 1,
      title: 'Create Account',
      description: 'Sign up with your basic information and create your provider profile.',
      time: '5 minutes',
    },
    {
      step: 2,
      title: 'Upload Documents',
      description: 'Submit required documents including police clearance and licenses.',
      time: '15 minutes',
    },
    {
      step: 3,
      title: 'Skills Verification',
      description: 'Complete skills assessment and upload portfolio of your work.',
      time: '30 minutes',
    },
    {
      step: 4,
      title: 'Profile Review',
      description: 'Our team reviews your application and verifies all documents.',
      time: '2-3 days',
    },
    {
      step: 5,
      title: 'Go Live',
      description: 'Start receiving bookings once your profile is approved and verified.',
      time: 'Instant',
    },
  ]

  const earnings = [
    { service: 'Plumbing', rate: 'Rs. 2,500-4,000/hour', demand: 'High' },
    { service: 'Electrical Work', rate: 'Rs. 3,000-5,000/hour', demand: 'High' },
    { service: 'House Cleaning', rate: 'Rs. 1,200-2,000/hour', demand: 'Very High' },
    { service: 'Gardening', rate: 'Rs. 1,500-2,500/hour', demand: 'Medium' },
    { service: 'Carpentry', rate: 'Rs. 2,000-3,500/hour', demand: 'High' },
    { service: 'Painting', rate: 'Rs. 1,800-3,000/hour', demand: 'Medium' },
  ]

  const handleStartApplication = () => {
    if (status === 'loading') {
      toast.info('Please wait while we check your login status...')
      return
    }

    if (!session) {
      toast.info('Please sign in to start your provider application')
      signIn()
      return
    }

    setShowApplicationForm(true)
  }

  return (
    <>
      <main className="pt-16">
        {/* Hero Section */}
        <section className="from-primary/10 to-background bg-gradient-to-b py-16">
          <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
            <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
              Become a Verified Provider
            </h1>
            <p className="text-muted-foreground mt-6 text-xl">
              Join Sri Lanka's trusted marketplace for home services. Get verified, build your
              reputation, and grow your business.
            </p>
            <div className="mt-8">
              <Button size="lg" className="px-8 py-3 text-lg" onClick={handleStartApplication}>
                Start Your Application
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-foreground text-3xl font-bold tracking-tight">
                Why Choose Weda.lk?
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">
                Join thousands of professionals already growing their business with us
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                      {benefit.icon}
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Earning Potential */}
        <section className="bg-muted/20 py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-foreground text-3xl font-bold tracking-tight">
                Earning Potential
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">
                See what verified providers are earning in different service categories
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {earnings.map((earning, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-foreground font-semibold">{earning.service}</h3>
                        <p className="text-primary mt-1 text-lg font-bold">{earning.rate}</p>
                      </div>
                      <Badge
                        variant={
                          earning.demand === 'Very High'
                            ? 'default'
                            : earning.demand === 'High'
                              ? 'secondary'
                              : 'outline'
                        }
                      >
                        {earning.demand} Demand
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground text-sm">
                * Rates vary based on experience, location, and service complexity. Platform fee:
                23%
              </p>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-foreground text-3xl font-bold tracking-tight">
                Requirements to Join
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">
                What you need to become a verified provider on our platform
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {requirements.map((requirement, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      {requirement.icon}
                      <CardTitle className="text-lg">{requirement.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{requirement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Onboarding Process */}
        <section className="bg-muted/20 py-16">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-foreground text-3xl font-bold tracking-tight">
                Getting Started Process
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">
                5 simple steps to become a verified provider
              </p>
            </div>

            <div className="space-y-6">
              {onboardingSteps.map((step) => (
                <Card key={step.step}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full font-bold">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-foreground text-lg font-semibold">{step.title}</h3>
                          <Badge variant="outline">{step.time}</Badge>
                        </div>
                        <p className="text-muted-foreground mt-1">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
            <h2 className="text-foreground text-3xl font-bold tracking-tight">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Join our platform and start building your professional reputation today
            </p>
            <div className="mt-8 space-x-4">
              <Button size="lg" className="px-8 py-3 text-lg" onClick={handleStartApplication}>
                Apply Now
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <ProviderApplicationForm onClose={() => setShowApplicationForm(false)} />
      )}
    </>
  )
}
