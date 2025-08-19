'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search } from 'lucide-react'
import { useRouter } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export function PopularServices() {
  const router = useRouter()
  const t = useTranslations('popularServices')
  const tServices = useTranslations('services')

  const serviceCategories = [
    { name: 'houseCleaning', displayName: tServices('cleaning'), icon: '🏠', popular: true },
    { name: 'plumbing', displayName: tServices('plumbing'), icon: '🔧', popular: true },
    { name: 'electrical', displayName: tServices('electrical'), icon: '⚡', popular: true },
    { name: 'gardening', displayName: tServices('gardening'), icon: '🌱', popular: false },
    { name: 'painting', displayName: tServices('painting'), icon: '🎨', popular: false },
    { name: 'carpentry', displayName: tServices('carpentry'), icon: '🪚', popular: false },
  ]

  return (
    <section className="bg-muted/20 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold">{t('title')}</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">{t('subtitle')}</p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-center">
            <Badge variant="secondary" className="bg-primary/20 text-primary px-4 py-2 font-medium">
              {t('mostRequested')}
            </Badge>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((category, index) => (
              <Card
                key={index}
                className="group hover:border-primary border-border bg-card cursor-pointer border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg"
                onClick={() => {
                  router.push(`/search?category=${encodeURIComponent(category.name)}`)
                }}
              >
                <CardContent className="flex items-center space-x-4 p-6">
                  <div className="flex-shrink-0 text-3xl">{category.icon}</div>
                  <div className="text-left">
                    <div className="group-hover:text-primary text-foreground text-base font-semibold transition-colors">
                      {category.displayName}
                    </div>
                    {category.popular && (
                      <Badge
                        variant="outline"
                        className="border-primary/50 text-primary mt-1 text-xs"
                      >
                        Popular
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 px-8 py-3 text-lg text-white shadow-lg"
              onClick={() => router.push('/search')}
            >
              <Search className="mr-2 h-5 w-5" />
              {t('findProviders')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
