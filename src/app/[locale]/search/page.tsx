'use client'

import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search,
  Home,
  Wrench,
  Zap,
  Hammer,
  PaintBucket,
  Leaf,
  Bug,
  Fan,
  Settings,
  Palette,
  Shield,
} from 'lucide-react'
import { useRouter } from '@/i18n/routing'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

export default function SearchPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const t = useTranslations()

  useEffect(() => {
    setMounted(true)
  }, [])

  const serviceCategories = [
    { name: t('serviceCategories.houseCleaning'), icon: Home, color: 'from-blue-500 to-cyan-500' },
    { name: t('serviceCategories.plumbing'), icon: Wrench, color: 'from-indigo-500 to-blue-500' },
    {
      name: t('serviceCategories.electricalWork'),
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
    },
    { name: t('serviceCategories.carpentry'), icon: Hammer, color: 'from-amber-500 to-yellow-500' },
    {
      name: t('serviceCategories.painting'),
      icon: PaintBucket,
      color: 'from-purple-500 to-pink-500',
    },
    { name: t('serviceCategories.gardening'), icon: Leaf, color: 'from-green-500 to-emerald-500' },
    { name: t('serviceCategories.pestControl'), icon: Bug, color: 'from-red-500 to-rose-500' },
    { name: t('serviceCategories.acRepair'), icon: Fan, color: 'from-cyan-500 to-blue-500' },
    {
      name: t('serviceCategories.applianceRepair'),
      icon: Settings,
      color: 'from-gray-500 to-slate-500',
    },
    {
      name: t('serviceCategories.interiorDesign'),
      icon: Palette,
      color: 'from-pink-500 to-purple-500',
    },
    { name: t('serviceCategories.handyman'), icon: Wrench, color: 'from-orange-500 to-red-500' },
    { name: t('serviceCategories.security'), icon: Shield, color: 'from-slate-500 to-gray-500' },
  ]

  const handleServiceClick = (serviceName: string) => {
    const searchParams = new globalThis.URLSearchParams()
    searchParams.set('service', serviceName.toLowerCase().replace(' ', '-'))
    router.push(`/search/results?${searchParams.toString()}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const service = formData.get('service') as string
    const location = formData.get('location') as string

    const searchParams = new globalThis.URLSearchParams()
    if (service) searchParams.set('service', service.toLowerCase().replace(/\s+/g, '-'))
    if (location) searchParams.set('location', location)

    router.push(`/search/results?${searchParams.toString()}`)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="bg-background min-h-screen" suppressHydrationWarning>
      <Navbar />

      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">{t('search.findServices')}</h1>
            <p className="text-muted-foreground">{t('search.discoverProviders')}</p>
          </div>

          {/* Search Interface */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="mr-2 h-5 w-5" />
                {t('search.searchForServices')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSearch}>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Input
                      name="service"
                      placeholder={t('search.whatServiceNeeded')}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Input
                      name="location"
                      placeholder={t('search.enterLocation')}
                      className="w-full"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Search className="mr-2 h-4 w-4" />
                    {t('search.searchButton')}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Service Categories */}
          <div className="mb-8 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {serviceCategories.map((service) => {
              const IconComponent = service.icon
              return (
                <Card
                  key={service.name}
                  className="group relative cursor-pointer overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-xl dark:from-gray-900 dark:to-gray-800"
                  onClick={() => handleServiceClick(service.name)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
                  />
                  <CardContent className="relative p-6 text-center">
                    <div
                      className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${service.color} text-white transition-transform duration-300 group-hover:scale-110`}
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium text-gray-900 transition-colors duration-300 group-hover:text-gray-700 dark:text-gray-100 dark:group-hover:text-gray-300">
                      {service.name}
                    </h3>
                    <div
                      className={`mt-2 h-1 w-0 rounded-full bg-gradient-to-r ${service.color} transition-all duration-300 group-hover:w-full`}
                    />
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Placeholder for Results */}
          <Card>
            <CardContent className="text-muted-foreground py-12 text-center">
              <Search className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <h3 className="mb-2 text-lg font-medium">{t('search.startSearch')}</h3>
              <p>{t('search.startSearchDesc')}</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
