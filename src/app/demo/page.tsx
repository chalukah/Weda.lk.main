'use client'

import { ServiceSearch } from '@/components/ServiceSearch'
import { ProviderCard } from '@/components/ProviderCard'
import { BookingFlow } from '@/components/BookingFlow'
import { TrustBadge } from '@/components/TrustBadge'
import { RatingDisplay } from '@/components/RatingDisplay'
import { LocationPicker } from '@/components/LocationPicker'
import { BottomNavigation } from '@/components/BottomNavigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'

// Mock data
const mockProvider = {
  id: '1',
  name: 'Kasun Silva',
  rating: 4.8,
  reviewCount: 127,
  distance: '2.3 km',
  responseTime: 'Usually responds within 30 min',
  services: ['Pipe Repair', 'Fixture Installation', 'Emergency Service'],
  priceRange: 'LKR 2,500+',
  verifications: [
    'police_verified' as const,
    'identity_verified' as const,
    'platform_verified' as const,
  ],
  location: 'Colombo 07',
  isOnline: true,
  isAvailable: true,
  profileImage: '/api/placeholder/120/120',
  description:
    'Experienced plumber with 8+ years in residential and commercial plumbing. Specialized in emergency repairs and modern fixture installations.',
}

export default function DemoPage() {
  const [showBooking, setShowBooking] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState('overview')

  const components = [
    { id: 'overview', name: 'Overview' },
    { id: 'trust-badges', name: 'Trust Badges' },
    { id: 'provider-cards', name: 'Provider Cards' },
    { id: 'search', name: 'Service Search' },
    { id: 'rating', name: 'Rating Display' },
    { id: 'location', name: 'Location Picker' },
    { id: 'booking', name: 'Booking Flow' },
    { id: 'navigation', name: 'Bottom Navigation' },
  ]

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'trust-badges':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Trust Badge Variants</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Badge Types</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <TrustBadge type="police_verified" />
                    <TrustBadge type="identity_verified" />
                    <TrustBadge type="professional_certified" />
                    <TrustBadge type="platform_verified" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Badge States</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <TrustBadge type="police_verified" state="active" />
                    <TrustBadge type="police_verified" state="pending" />
                    <TrustBadge type="police_verified" state="expired" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )

      case 'provider-cards':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Provider Card Variants</h3>
              <div className="grid gap-6">
                <div>
                  <h4 className="mb-3 font-medium">Minimal Variant</h4>
                  <ProviderCard provider={mockProvider} variant="minimal" />
                </div>

                <div>
                  <h4 className="mb-3 font-medium">Compact Variant (Default)</h4>
                  <ProviderCard
                    provider={mockProvider}
                    variant="compact"
                    onBook={() => setShowBooking(true)}
                    onContact={() => console.log('Contact provider')}
                    onFavorite={() => console.log('Favorite toggled')}
                  />
                </div>

                <div>
                  <h4 className="mb-3 font-medium">Expanded Variant</h4>
                  <ProviderCard
                    provider={{
                      ...mockProvider,
                      image: '/api/placeholder/400/200',
                    }}
                    variant="expanded"
                    onBook={() => setShowBooking(true)}
                    onContact={() => console.log('Contact provider')}
                    onFavorite={() => console.log('Favorite toggled')}
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 'search':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Service Search Interface</h3>
              <ServiceSearch
                onSearch={(query, filters) => console.log('Search:', query, filters)}
              />
            </div>
          </div>
        )

      case 'rating':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Rating Display Variants</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Variants</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="mb-2 text-sm font-medium">Full (Default)</p>
                      <RatingDisplay rating={4.7} reviewCount={89} />
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium">Compact</p>
                      <RatingDisplay rating={4.7} reviewCount={89} variant="compact" />
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium">Detailed</p>
                      <RatingDisplay
                        rating={4.7}
                        reviewCount={89}
                        variant="detailed"
                        showVerifiedIndicator
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Sizes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="mb-2 text-sm font-medium">Small</p>
                      <RatingDisplay rating={4.7} reviewCount={89} size="sm" />
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium">Medium (Default)</p>
                      <RatingDisplay rating={4.7} reviewCount={89} size="md" />
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium">Large</p>
                      <RatingDisplay rating={4.7} reviewCount={89} size="lg" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )

      case 'location':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Location Picker Variants</h3>
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Search Variant</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LocationPicker variant="search" placeholder="Enter your address" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Detect Variant</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LocationPicker
                      variant="detect"
                      placeholder="Enter address or detect location"
                      showServiceArea
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Map Variant</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LocationPicker variant="map" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )

      case 'booking':
        return (
          <div className="space-y-6">
            {showBooking ? (
              <BookingFlow
                provider={mockProvider}
                onComplete={(booking) => {
                  console.log('Booking completed:', booking)
                  setShowBooking(false)
                }}
                onCancel={() => setShowBooking(false)}
              />
            ) : (
              <div className="text-center">
                <h3 className="mb-4 text-lg font-semibold">Booking Flow Demo</h3>
                <p className="text-muted-foreground mb-6">
                  Click the button below to start the booking flow demo
                </p>
                <Button onClick={() => setShowBooking(true)}>Start Booking Flow</Button>
              </div>
            )}
          </div>
        )

      case 'navigation':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Bottom Navigation</h3>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Customer Navigation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted relative rounded-lg p-4">
                      <BottomNavigation userType="customer" />
                      <p className="text-muted-foreground mb-16 text-center text-sm">
                        Mobile bottom navigation for customers
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Provider Navigation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted relative rounded-lg p-4">
                      <BottomNavigation userType="provider" />
                      <p className="text-muted-foreground mb-16 text-center text-sm">
                        Mobile bottom navigation for providers
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-xl font-bold">Weda.lk Component Library</h3>
              <p className="text-muted-foreground mb-6">
                This demo showcases the core components built according to the Weda.lk UI/UX
                specification. All components are mobile-first, accessible, and follow the
                trust-building design principles.
              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card className="hover-lift">
                  <CardHeader>
                    <CardTitle className="flex items-center text-base">
                      🛡️ Trust-First Design
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Police verification badges, transparent pricing, and verified reviews build
                      customer confidence.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover-lift">
                  <CardHeader>
                    <CardTitle className="flex items-center text-base">📱 Mobile-First</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Responsive design with thumb-friendly navigation optimized for Sri Lankan
                      mobile usage patterns.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover-lift">
                  <CardHeader>
                    <CardTitle className="flex items-center text-base">♿ Accessible</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      WCAG 2.1 AA compliant with semantic HTML, keyboard navigation, and screen
                      reader support.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover-lift">
                  <CardHeader>
                    <CardTitle className="flex items-center text-base">
                      🎨 Brand Consistent
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Green color palette, consistent typography, and trust-building visual elements
                      throughout.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-foreground mb-2 text-3xl font-bold">Component Demo</h1>
          <p className="text-muted-foreground">Interactive showcase of Weda.lk UI components</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Components</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {components.map((component) => (
                  <button
                    key={component.id}
                    onClick={() => setSelectedComponent(component.id)}
                    className={`hover:bg-muted w-full px-4 py-3 text-left text-sm transition-colors ${
                      selectedComponent === component.id
                        ? 'bg-primary/10 text-primary border-primary border-r-2'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {component.name}
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="animate-fade-in">{renderComponent()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
