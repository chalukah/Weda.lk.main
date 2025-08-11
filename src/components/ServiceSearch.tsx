'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Search,
  MapPin,
  Filter,
  SlidersHorizontal,
  Grid3x3,
  List,
  Star,
  DollarSign,
  Clock,
  Shield,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

interface ServiceSearchProps {
  onSearch?: (query: string, filters: SearchFilters) => void
  className?: string
}

export interface SearchFilters {
  category?: string
  priceRange?: [number, number]
  rating?: number
  distance?: number
  availability?: 'all' | 'available' | 'today'
  verificationTypes?: string[]
  sortBy?: 'distance' | 'rating' | 'price' | 'response_time'
}

const serviceCategories = [
  { id: 'cleaning', name: 'House Cleaning', icon: '🏠' },
  { id: 'plumbing', name: 'Plumbing', icon: '🔧' },
  { id: 'electrical', name: 'Electrical', icon: '⚡' },
  { id: 'gardening', name: 'Gardening', icon: '🌱' },
  { id: 'painting', name: 'Painting', icon: '🎨' },
  { id: 'carpentry', name: 'Carpentry', icon: '🪚' },
  { id: 'appliance', name: 'Appliance Repair', icon: '🔨' },
  { id: 'other', name: 'Other Services', icon: '⚙️' },
]

export function ServiceSearch({ onSearch, className }: ServiceSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('Colombo')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filters, setFilters] = useState<SearchFilters>({
    sortBy: 'distance',
  })
  const [isClient, setIsClient] = useState(false)

  // Ensure client-side rendering consistency
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Auto-detect location on component mount (only on client)
  useEffect(() => {
    if (!isClient) return

    const detectLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            () => setLocation('Colombo'), // Mock location after detection
            () => setLocation('Colombo'), // Default to Colombo if detection fails
            { timeout: 3000, maximumAge: 300000 }
          )
        }
      } catch {
        // Keep default location
      }
    }

    detectLocation()
  }, [isClient])

  const handleSearch = () => {
    onSearch?.(searchQuery, filters)
  }

  const handleFilterToggle = () => {
    setShowFilters(!showFilters)
  }

  const quickFilters = [
    { label: 'Nearby', value: 'nearby', icon: MapPin },
    { label: 'Top Rated', value: 'rating', icon: Star },
    { label: 'Fast Response', value: 'response', icon: Clock },
    { label: 'Police Verified', value: 'verified', icon: Shield },
  ]

  return (
    <div className={cn('w-full space-y-4', className)}>
      {/* Main Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Search Input */}
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                <Input
                  placeholder="What service do you need?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="h-12 pl-10"
                />
              </div>
              <div className="relative">
                <MapPin className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                <Input
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="h-12 w-32 pl-10 md:w-40"
                />
              </div>
              <Button onClick={handleSearch} className="h-12 px-6">
                Search
              </Button>
            </div>

            {/* Service Categories */}
            <div className="grid grid-cols-4 gap-2 md:grid-cols-8">
              {serviceCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setFilters({ ...filters, category: category.id })}
                  className={cn(
                    'flex flex-col items-center rounded-lg border p-3 transition-all duration-200',
                    'hover:border-primary hover:bg-primary/5',
                    filters.category === category.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-background'
                  )}
                >
                  <span className="mb-1 text-lg">{category.icon}</span>
                  <span className="text-center text-xs leading-tight">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Filters & Controls */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center space-x-2">
          {quickFilters.map((filter) => {
            const Icon = filter.icon
            return (
              <Button
                key={filter.value}
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={() => {
                  // Toggle quick filter logic here
                  console.log(`Toggle ${filter.value}`)
                }}
              >
                <Icon className="mr-1 h-3 w-3" />
                {filter.label}
              </Button>
            )
          })}
        </div>

        <div className="flex items-center space-x-2">
          {/* View Mode Toggle */}
          <div className="hidden rounded-md border md:flex">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Advanced Filters */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleFilterToggle}
            className="flex items-center space-x-1"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
            {Object.keys(filters).length > 1 && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                {Object.keys(filters).length - 1}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <h3 className="text-foreground font-medium">Advanced Filters</h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Price Range */}
                <div>
                  <label className="text-foreground mb-2 block text-sm font-medium">
                    Price Range
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Input type="number" placeholder="Min" className="h-8" />
                      <span className="text-muted-foreground">to</span>
                      <Input type="number" placeholder="Max" className="h-8" />
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="text-foreground mb-2 block text-sm font-medium">
                    Minimum Rating
                  </label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Button
                        key={rating}
                        variant={filters.rating === rating ? 'default' : 'outline'}
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => setFilters({ ...filters, rating })}
                      >
                        {rating}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="text-foreground mb-2 block text-sm font-medium">
                    Availability
                  </label>
                  <div className="space-y-1">
                    {[
                      { value: 'all', label: 'Any time' },
                      { value: 'available', label: 'Available now' },
                      { value: 'today', label: 'Available today' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="availability"
                          value={option.value}
                          checked={filters.availability === option.value}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              availability: e.target.value as 'all' | 'available' | 'today',
                            })
                          }
                          className="text-primary focus:ring-primary"
                        />
                        <span className="text-foreground text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verification Types */}
              <div>
                <label className="text-foreground mb-2 block text-sm font-medium">
                  Verification Requirements
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'police_verified', label: 'Police Verified' },
                    { value: 'identity_verified', label: 'Identity Verified' },
                    { value: 'professional_certified', label: 'Professional Certified' },
                  ].map((verification) => (
                    <Button
                      key={verification.value}
                      variant={
                        filters.verificationTypes?.includes(verification.value)
                          ? 'default'
                          : 'outline'
                      }
                      size="sm"
                      onClick={() => {
                        const currentTypes = filters.verificationTypes || []
                        const newTypes = currentTypes.includes(verification.value)
                          ? currentTypes.filter((t) => t !== verification.value)
                          : [...currentTypes, verification.value]
                        setFilters({ ...filters, verificationTypes: newTypes })
                      }}
                    >
                      {verification.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="border-border flex justify-between border-t pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilters({ sortBy: 'distance' })}
                >
                  Clear All
                </Button>
                <Button size="sm" onClick={handleSearch}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
