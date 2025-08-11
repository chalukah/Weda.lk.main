import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Search, UserCheck, Calendar, CreditCard, Shield, Star, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function HowItWorksPage() {
  const customerSteps = [
    {
      step: 1,
      icon: <Search className="text-primary h-8 w-8" />,
      title: 'Search & Browse',
      description:
        'Find verified service providers in your area. Browse by category or search for specific services.',
    },
    {
      step: 2,
      icon: <UserCheck className="text-primary h-8 w-8" />,
      title: 'Compare Providers',
      description:
        'View profiles, ratings, and police verification status. Read reviews from previous customers.',
    },
    {
      step: 3,
      icon: <Calendar className="text-primary h-8 w-8" />,
      title: 'Book Service',
      description:
        'Select your preferred date and time. Provide service details and confirm your booking.',
    },
    {
      step: 4,
      icon: <CreditCard className="text-primary h-8 w-8" />,
      title: 'Secure Payment',
      description:
        'Pay securely through our escrow system. Your payment is held until service completion.',
    },
  ]

  const providerSteps = [
    {
      step: 1,
      icon: <UserCheck className="text-primary h-8 w-8" />,
      title: 'Complete Verification',
      description:
        'Submit required documents including police clearance certificate for verification.',
    },
    {
      step: 2,
      icon: <Shield className="text-primary h-8 w-8" />,
      title: 'Profile Approval',
      description: 'Our team reviews and approves your profile. Get verified provider status.',
    },
    {
      step: 3,
      icon: <Calendar className="text-primary h-8 w-8" />,
      title: 'Receive Bookings',
      description: 'Get notified of booking requests. Accept jobs that fit your schedule.',
    },
    {
      step: 4,
      icon: <Star className="text-primary h-8 w-8" />,
      title: 'Complete & Earn',
      description: 'Provide quality service, get paid, and build your reputation through reviews.',
    },
  ]

  const trustFeatures = [
    {
      icon: <Shield className="h-6 w-6 text-green-600" />,
      title: 'Police Verification',
      description:
        'All service providers undergo thorough background checks including police clearance.',
    },
    {
      icon: <CreditCard className="h-6 w-6 text-blue-600" />,
      title: 'Secure Payments',
      description: 'Escrow payment system protects both customers and providers.',
    },
    {
      icon: <Star className="h-6 w-6 text-yellow-600" />,
      title: 'Verified Reviews',
      description: 'Authentic reviews from real customers who used the service.',
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-purple-600" />,
      title: 'Quality Guarantee',
      description: 'We ensure service quality through our verification and review system.',
    },
  ]

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="from-primary/10 to-background bg-gradient-to-b py-16">
          <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
            <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
              How Weda.lk Works
            </h1>
            <p className="text-muted-foreground mt-6 text-xl">
              Connecting customers with verified service providers in Sri Lanka. Safe, secure, and
              simple.
            </p>
          </div>
        </section>

        {/* For Customers */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-foreground text-3xl font-bold tracking-tight">For Customers</h2>
              <p className="text-muted-foreground mt-4 text-lg">
                Find and book trusted service providers in 4 simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {customerSteps.map((step) => (
                <Card key={step.step} className="text-center">
                  <CardHeader>
                    <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                      {step.icon}
                    </div>
                    <div className="mb-2">
                      <Badge variant="outline" className="text-sm">
                        Step {step.step}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* For Providers */}
        <section className="bg-muted/20 py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-foreground text-3xl font-bold tracking-tight">
                For Service Providers
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">
                Join our platform and grow your business with verified customers
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {providerSteps.map((step) => (
                <Card key={step.step} className="text-center">
                  <CardHeader>
                    <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                      {step.icon}
                    </div>
                    <div className="mb-2">
                      <Badge variant="outline" className="text-sm">
                        Step {step.step}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust & Safety */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-foreground text-3xl font-bold tracking-tight">
                Trust & Safety First
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">
                We prioritize your safety with comprehensive verification and security measures
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {trustFeatures.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-muted/20 py-16">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-foreground text-3xl font-bold tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    How do I know a provider is trustworthy?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All our service providers undergo police verification and background checks.
                    Look for the verified badge and read authentic customer reviews.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How does the payment system work?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We use an escrow payment system. Your payment is held securely until the service
                    is completed to your satisfaction, protecting both you and the provider.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    What if I'm not satisfied with the service?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We have a dispute resolution process. Contact our support team, and we'll work
                    with both parties to find a fair solution.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
