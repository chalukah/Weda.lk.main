'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  MapPin,
  Crosshair,
  Navigation,
  Search,
  AlertCircle,
  CheckCircle,
  Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { allCities, searchLocations, getLocationData } from '@/lib/locations'
import { useTranslations } from 'next-intl'

export interface Location {
  address: string
  city: string
  district: string
  coordinates?: {
    lat: number
    lng: number
  }
  placeId?: string
}

interface LocationPickerProps {
  value?: Location | undefined
  onChange?: (location: Location) => void
  onLocationDetected?: (location: Location) => void
  placeholder?: string
  className?: string
  variant?: 'map' | 'search' | 'detect'
  showServiceArea?: boolean
}

type LocationState = 'idle' | 'detecting' | 'detected' | 'manual' | 'error'

// Service areas - all Sri Lankan cities are now supported
const serviceAreas = allCities

// Generate Sri Lankan addresses database from comprehensive cities data
const generateAddresses = (): Location[] => {
  const addresses: Location[] = []

  // Generate addresses for all cities
  allCities.forEach((city) => {
    const locationData = getLocationData(city)

    addresses.push({
      address: `Main Street, ${city}`,
      city: city,
      district: locationData.district,
      coordinates: { lat: 6.9271, lng: 79.8612 }, // Default coordinates - in real app, use actual coordinates
    })

    // Add some common road names for major cities
    if (
      [
        'Colombo',
        'Kandy',
        'Galle',
        'Negombo',
        'Jaffna',
        'Anuradhapura',
        'Trincomalee',
        'Batticaloa',
        'Matara',
      ].includes(city)
    ) {
      const roads = [
        'Galle Road',
        'Kandy Road',
        'Main Street',
        'High Street',
        'Station Road',
        'Hospital Road',
        'Temple Road',
      ]
      roads.forEach((road) => {
        addresses.push({
          address: `${road}, ${city}`,
          city: city,
          district: locationData.district,
          coordinates: { lat: 6.9271, lng: 79.8612 },
        })
      })
    }
  })

  return addresses
}

const sriLankanAddresses = generateAddresses()

export function LocationPicker({
  value,
  onChange,
  onLocationDetected,
  placeholder,
  className,
  variant = 'search',
  showServiceArea = true,
}: LocationPickerProps) {
  const t = useTranslations()
  const [locationState, setLocationState] = useState<LocationState>('idle')
  const [searchQuery, setSearchQuery] = useState(value?.address || '')
  const [suggestions, setSuggestions] = useState<Location[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [error, setError] = useState<string>('')

  const defaultPlaceholder = placeholder || t('location.enterAddress')

  const handleDetectLocation = async () => {
    setLocationState('detecting')
    setError('')

    if (!navigator.geolocation) {
      setError(t('location.locationNotSupported'))
      setLocationState('error')
      return
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        })
      })

      // In real app, reverse geocode the coordinates
      const detectedLocation: Location = {
        address: '123 Current Location Street, Colombo 07',
        city: 'Colombo',
        district: 'Colombo',
        coordinates: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      }

      setLocationState('detected')
      onChange?.(detectedLocation)
      onLocationDetected?.(detectedLocation)
      setSearchQuery(detectedLocation.address)
    } catch (err) {
      setError(t('location.unableToDetect'))
      setLocationState('error')
    }
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setLocationState('manual')

    // Search Sri Lankan addresses database with enhanced search
    if (query.length > 1) {
      // Use the enhanced search function
      const locationResults = searchLocations(query)

      // Convert to Location format and add address variations
      const filtered: Location[] = []

      locationResults.forEach((result) => {
        // Add main city entry
        filtered.push({
          address: `${result.city}`,
          city: result.city,
          district: result.district,
          coordinates: { lat: 6.9271, lng: 79.8612 },
        })

        // Add with district for clarity
        if (result.city !== result.district) {
          filtered.push({
            address: `${result.city}, ${result.district}`,
            city: result.city,
            district: result.district,
            coordinates: { lat: 6.9271, lng: 79.8612 },
          })
        }
      })

      // Also search existing address database for street-level results
      const streetResults = sriLankanAddresses
        .filter(
          (addr) =>
            addr.address.toLowerCase().includes(query.toLowerCase()) ||
            addr.city.toLowerCase().includes(query.toLowerCase()) ||
            addr.district.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5) // Limit street results

      // Combine and deduplicate results
      const combined = [...filtered, ...streetResults]
      const unique = combined.filter(
        (addr, index, self) => index === self.findIndex((a) => a.address === addr.address)
      )

      setSuggestions(unique.slice(0, 15)) // Limit total results
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
      setSuggestions([])
    }
  }

  const handleSelectSuggestion = (location: Location) => {
    setSearchQuery(location.address)
    onChange?.(location)
    setShowSuggestions(false)
    setSuggestions([])
    setLocationState('detected')
    setError('')
  }

  const isInServiceArea = (city: string) => {
    return serviceAreas.includes(city as any)
  }

  const getLocationIcon = () => {
    switch (locationState) {
      case 'detecting':
        return <Loader2 className="h-4 w-4 animate-spin" />
      case 'detected':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  return (
    <div className={cn('w-full space-y-2', className)}>
      {variant !== 'map' && (
        <div className="space-y-2">
          {/* Search Input */}
          <div className="relative">
            <div className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 transform">
              {getLocationIcon()}
            </div>
            <Input
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={defaultPlaceholder}
              className={cn(
                'pr-4 pl-10',
                locationState === 'error' && 'border-red-500',
                locationState === 'detected' && 'border-green-500'
              )}
            />

            {variant === 'detect' && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleDetectLocation}
                disabled={locationState === 'detecting'}
                className="absolute top-1/2 right-1 h-8 -translate-y-1/2 transform"
              >
                <Navigation className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center space-x-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          {/* Address Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <Card className="absolute z-50 mt-1 w-full">
              <CardContent className="p-0">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    className="hover:bg-muted w-full border-b px-4 py-3 text-left transition-colors last:border-b-0"
                  >
                    <div className="flex items-start space-x-3">
                      <MapPin className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-foreground text-sm font-medium">{suggestion.address}</p>
                        <p className="text-muted-foreground text-xs">
                          {suggestion.city}, {suggestion.district}
                        </p>
                        {showServiceArea && (
                          <div className="mt-1">
                            <Badge
                              variant={isInServiceArea(suggestion.city) ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {isInServiceArea(suggestion.city)
                                ? t('location.serviceAvailable')
                                : t('location.outsideServiceArea')}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Detect Current Location Button */}
      {variant !== 'search' && (
        <div className="flex space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleDetectLocation}
            disabled={locationState === 'detecting'}
            className="flex-1"
          >
            <Crosshair className="mr-2 h-4 w-4" />
            {locationState === 'detecting'
              ? t('location.detecting')
              : t('location.useCurrentLocation')}
          </Button>
        </div>
      )}

      {/* Service Area Info */}
      {showServiceArea && value?.city && (
        <div
          className={cn(
            'rounded-lg border p-3',
            isInServiceArea(value.city)
              ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950'
              : 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950'
          )}
        >
          <div className="flex items-center space-x-2">
            {isInServiceArea(value.city) ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700 dark:text-green-300">
                  {t('location.greatService', { city: value.city })}
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm text-yellow-700 dark:text-yellow-300">
                  {t('location.dontServiceArea', { city: value.city })}
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Map View (OpenStreetMap alternative) */}
      {variant === 'map' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">{t('location.selectLocationOnMap')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted text-muted-foreground flex h-64 items-center justify-center rounded-lg border-2 border-dashed">
              {/* OpenStreetMap alternative - simple location selection */}
              <div className="text-center">
                <MapPin className="mx-auto mb-2 h-8 w-8" />
                <p className="text-sm">{t('location.locationSelector')}</p>
                <p className="text-xs">{t('location.useCurrentOrSearch')}</p>
                <p className="mt-2 text-xs text-yellow-600">{t('location.mapViewAvailable')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
