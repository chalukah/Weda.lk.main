import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Search, UserCheck, Calendar, CreditCard, Shield, Star, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getTranslations, getLocale } from 'next-intl/server'

export default async function HowItWorksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.howItWorks' })
  const customerSteps = [
    {
      step: 1,
      icon: <Search className="text-primary h-8 w-8" />,
      title: t('customerSteps.step1Title'),
      description: t('customerSteps.step1Desc'),
    },
    {
      step: 2,
      icon: <UserCheck className="text-primary h-8 w-8" />,
      title: t('customerSteps.step2Title'),
      description: t('customerSteps.step2Desc'),
    },
    {
      step: 3,
      icon: <Calendar className="text-primary h-8 w-8" />,
      title: t('customerSteps.step3Title'),
      description: t('customerSteps.step3Desc'),
    },
    {
      step: 4,
      icon: <CreditCard className="text-primary h-8 w-8" />,
      title: t('customerSteps.step4Title'),
      description: t('customerSteps.step4Desc'),
    },
  ]

  const providerSteps = [
    {
      step: 1,
      icon: <UserCheck className="text-primary h-8 w-8" />,
      title: t('providerSteps.step1Title'),
      description: t('providerSteps.step1Desc'),
    },
    {
      step: 2,
      icon: <Shield className="text-primary h-8 w-8" />,
      title: t('providerSteps.step2Title'),
      description: t('providerSteps.step2Desc'),
    },
    {
      step: 3,
      icon: <Calendar className="text-primary h-8 w-8" />,
      title: t('providerSteps.step3Title'),
      description: t('providerSteps.step3Desc'),
    },
    {
      step: 4,
      icon: <Star className="text-primary h-8 w-8" />,
      title: t('providerSteps.step4Title'),
      description: t('providerSteps.step4Desc'),
    },
  ]

  const trustFeatures = [
    {
      icon: <Shield className="h-6 w-6 text-green-600" />,
      title: t('trustFeatures.policeVerification'),
      description: t('trustFeatures.policeVerificationDesc'),
    },
    {
      icon: <CreditCard className="h-6 w-6 text-blue-600" />,
      title: t('trustFeatures.securePayments'),
      description: t('trustFeatures.securePaymentsDesc'),
    },
    {
      icon: <Star className="h-6 w-6 text-yellow-600" />,
      title: t('trustFeatures.verifiedReviews'),
      description: t('trustFeatures.verifiedReviewsDesc'),
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-purple-600" />,
      title: t('trustFeatures.qualityGuarantee'),
      description: t('trustFeatures.qualityGuaranteeDesc'),
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
              {t('heroTitle')}
            </h1>
            <p className="text-muted-foreground mt-6 text-xl">{t('heroSubtitle')}</p>
          </div>
        </section>

        {/* For Customers */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-foreground text-3xl font-bold tracking-tight">
                {t('forCustomers')}
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">{t('forCustomersSubtitle')}</p>
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
                        {t('step')} {step.step}
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
                {t('forProviders')}
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">{t('forProvidersSubtitle')}</p>
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
                        {t('step')} {step.step}
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
                {t('trustSafetyTitle')}
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">{t('trustSafetySubtitle')}</p>
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
              <h2 className="text-foreground text-3xl font-bold tracking-tight">{t('faqTitle')}</h2>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('faq.q1')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t('faq.a1')}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('faq.q2')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t('faq.a2')}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('faq.q3')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t('faq.a3')}</p>
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
