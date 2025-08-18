'use client'

import { useState, useEffect } from 'react'
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
import { useTranslations } from 'next-intl'

export function BecomeProviderContent() {
  const { data: session, status } = useSession()
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('pages.becomeProvider')

  // Prevent hydration mismatch by only rendering after component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  const benefits = [
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: t('growBusiness'),
      description: t('growBusinessDesc'),
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: t('buildTrust'),
      description: t('buildTrustDesc'),
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: t('verifiedCustomers'),
      description: t('verifiedCustomersDesc'),
    },
    {
      icon: <CreditCard className="h-8 w-8 text-orange-600" />,
      title: t('securePayments'),
      description: t('securePaymentsDesc'),
    },
  ]

  const requirements = [
    {
      icon: <FileText className="text-primary h-6 w-6" />,
      title: t('validNicPassport'),
      description: t('validNicPassportDesc'),
    },
    {
      icon: <Shield className="text-primary h-6 w-6" />,
      title: t('policeClearance'),
      description: t('policeClearanceDesc'),
      highlight: true,
    },
    {
      icon: <CheckCircle className="text-primary h-6 w-6" />,
      title: t('skillsVerification'),
      description: t('skillsVerificationDesc'),
    },
  ]

  const onboardingSteps = [
    {
      step: 1,
      title: t('createAccount'),
      description: t('createAccountDesc'),
      time: `2 ${t('minutes')}`,
    },
    {
      step: 2,
      title: t('uploadIdCopy'),
      description: t('uploadIdCopyDesc'),
      time: `1 ${t('minute')}`,
    },
    {
      step: 3,
      title: t('skillsVerificationStep'),
      description: t('skillsVerificationStepDesc'),
      time: `2 ${t('minutes')}`,
    },
    {
      step: 4,
      title: t('profileReview'),
      description: t('profileReviewDesc'),
      time: `5 ${t('minutes')}`,
    },
    {
      step: 5,
      title: t('goLive'),
      description: t('goLiveDesc'),
      time: t('instant'),
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

  // Prevent hydration mismatch by only rendering client-dependent content after mount
  if (!mounted) {
    return (
      <main className="pt-16">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="text-center">Loading...</div>
        </div>
      </main>
    )
  }

  return (
    <>
      <main className="pt-16">
        {/* Hero Section */}
        <section className="from-primary/10 to-background bg-gradient-to-b py-16">
          <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
            <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
              {t('heroTitle')}
            </h1>
            <p className="text-muted-foreground mt-6 text-xl">{t('heroSubtitle')}</p>
            <div className="mt-8">
              <Button size="lg" className="px-8 py-3 text-lg" onClick={handleStartApplication}>
                {t('startApplication')}
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-foreground text-3xl font-bold tracking-tight">
                {t('benefitsTitle')}
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">{t('benefitsSubtitle')}</p>
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
                {t('earningPotentialTitle')}
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">{t('earningPotentialSubtitle')}</p>
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
                        {earning.demand === 'Very High'
                          ? t('veryHigh')
                          : earning.demand === 'High'
                            ? t('high')
                            : t('medium')}{' '}
                        {t('demand')}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground text-sm">{t('ratesNote')}</p>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-foreground text-3xl font-bold tracking-tight">
                {t('requirementsTitle')}
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">{t('requirementsSubtitle')}</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {requirements.map((requirement, index) => (
                <Card
                  key={index}
                  className={requirement.highlight ? 'border-orange-200 bg-orange-50/50' : ''}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      {requirement.icon}
                      <CardTitle className="text-lg">{requirement.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p
                      className={`text-sm ${requirement.highlight ? 'font-medium text-orange-700' : 'text-muted-foreground'}`}
                    >
                      {requirement.description}
                    </p>
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
                {t('processTitle')}
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">{t('processSubtitle')}</p>
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
              {t('readyToStart')}
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">{t('readyToStartDesc')}</p>
            <div className="mt-8 space-x-4">
              <Button size="lg" className="px-8 py-3 text-lg" onClick={handleStartApplication}>
                {t('applyNow')}
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                {t('learnMore')}
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
