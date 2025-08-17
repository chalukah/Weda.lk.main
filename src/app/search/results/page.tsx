'use client'

import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, MapPin, Phone, Clock, ArrowLeft } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

interface Provider {
  id: string
  name: string
  rating: number
  reviews: number
  distance: string
  price: string
  phone: string
  availability: string
  services: string[]
  description?: string
  completedJobs: number
  verified: boolean
  profileImage?: string
}

interface SearchResponse {
  providers: Provider[]
  pagination: {
    total: number
    limit: number
    offset: number
    hasMore: boolean
  }
}

function SearchResultsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const service = searchParams.get('service')
  const location = searchParams.get('location')

  const [providers, setProviders] = useState<Provider[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (service) params.set('service', service)
        if (location) params.set('location', location)

        const response = await fetch(`/api/providers/search?${params.toString()}`)
        if (!response.ok) {
          throw new Error('Failed to fetch providers')
        }

        const data: SearchResponse = await response.json()
        setProviders(data.providers)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchProviders()
  }, [service, location])

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold capitalize">
                {service?.replace('-', ' ')} Services
              </h1>
              <p className="text-muted-foreground">
                {loading ? 'Searching...' : `${providers.length} providers found near you`}
              </p>
            </div>
          </div>

          {loading && (
            <div className="grid gap-6 lg:grid-cols-1">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4 md:flex-row">
                        <div className="flex-shrink-0">
                          <div className="h-24 w-24 animate-pulse rounded-lg bg-gray-200" />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="h-6 animate-pulse rounded bg-gray-200" />
                          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                          <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}

          {error && (
            <Card>
              <CardContent className="py-12 text-center">
                <h3 className="mb-2 text-lg font-medium text-red-600">Error Loading Providers</h3>
                <p className="text-muted-foreground mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
              </CardContent>
            </Card>
          )}

          {!loading && !error && (
            <div className="grid gap-6 lg:grid-cols-1">
              {providers.map((provider) => (
                <Card
                  key={provider.id}
                  className="overflow-hidden transition-shadow hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 md:flex-row">
                      <div className="flex-shrink-0">
                        {provider.profileImage ? (
                          <img
                            src={provider.profileImage}
                            alt={provider.name}
                            className="h-24 w-24 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-gradient-to-br from-gray-200 to-gray-300">
                            <span className="text-2xl font-bold text-gray-500">
                              {provider.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold">{provider.name}</h3>
                              {provider.verified && (
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  Verified
                                </Badge>
                              )}
                            </div>

                            <div className="text-muted-foreground mt-1 flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{provider.rating}</span>
                                <span>({provider.reviews} reviews)</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{provider.distance}</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-primary text-lg font-semibold">
                              {provider.price}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-green-600">
                              <Clock className="h-3 w-3" />
                              <span>{provider.availability}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <div className="text-muted-foreground flex items-center gap-1 text-sm">
                            <Phone className="h-4 w-4" />
                            <span>{provider.phone}</span>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                            <Button size="sm">Book Now</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && !error && providers.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <h3 className="mb-2 text-lg font-medium">No providers found</h3>
                <p className="text-muted-foreground mb-4">
                  No service providers are currently available for "{service?.replace('-', ' ')}" in
                  your area.
                </p>
                <p className="text-muted-foreground text-sm">
                  Try searching for different services or check back later as new providers join our
                  platform.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResultsContent />
    </Suspense>
  )
}
