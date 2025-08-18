import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Target, Shield, Award } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function AboutPage() {
  const t = useTranslations('pages.about')
  return (
    <div className="bg-background min-h-screen" suppressHydrationWarning>
      <Navbar />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 text-4xl font-bold md:text-6xl">
                {t('heroTitle')} <span className="text-primary">වැඩ.lk</span>
              </h1>
              <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
                {t('heroSubtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <Target className="text-primary mb-4 h-12 w-12" />
                  <CardTitle className="text-2xl">{t('missionTitle')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t('missionText')}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Award className="text-primary mb-4 h-12 w-12" />
                  <CardTitle className="text-2xl">{t('visionTitle')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t('visionText')}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">{t('valuesTitle')}</h2>
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
              <Card className="text-center">
                <CardHeader>
                  <Shield className="text-primary mx-auto mb-4 h-12 w-12" />
                  <CardTitle>{t('trustTitle')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t('trustText')}</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Users className="text-primary mx-auto mb-4 h-12 w-12" />
                  <CardTitle>{t('communityTitle')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t('communityText')}</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Target className="text-primary mx-auto mb-4 h-12 w-12" />
                  <CardTitle>{t('excellenceTitle')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t('excellenceText')}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">{t('storyTitle')}</h2>
            <div className="mx-auto max-w-4xl">
              <Card>
                <CardContent className="p-8">
                  <p className="text-muted-foreground mb-6 text-lg">{t('storyPara1')}</p>
                  <p className="text-muted-foreground mb-6 text-lg">{t('storyPara2')}</p>
                  <p className="text-muted-foreground text-lg">{t('storyPara3')}</p>
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
