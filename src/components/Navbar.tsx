'use client'

import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { LocationPicker, Location } from '@/components/LocationPicker'
import { TrustBadge } from '@/components/TrustBadge'
import { useState, useEffect } from 'react'
import { Menu, X, MapPin, Search } from 'lucide-react'
import Link from 'next/link'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<Location | null>({
    address: 'Colombo, Sri Lanka',
    city: 'Colombo',
    district: 'Colombo',
  })
  const [isLocationDetected, setIsLocationDetected] = useState(true)
  const [isClient, setIsClient] = useState(false)

  // Ensure client-side rendering consistency
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Auto-detect location on component mount (only on client)
  useEffect(() => {
    if (!isClient) return

    const detectLocation = async () => {
      if (!navigator.geolocation) {
        return
      }

      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 300000,
          })
        })

        // In real app, reverse geocode the coordinates
        setCurrentLocation({
          address: 'Current Location, Colombo',
          city: 'Colombo',
          district: 'Colombo',
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        })
      } catch (err) {
        // Keep default Colombo location if detection fails
      }
    }

    detectLocation()
  }, [isClient])

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="border-border bg-background/80 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded">
                <span className="text-primary-foreground text-sm font-bold">W</span>
              </div>
              <span className="text-foreground text-xl font-bold">Weda.lk</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-foreground flex items-center space-x-1 text-sm font-medium transition-colors"
                >
                  <Search className="h-4 w-4" />
                  <span>Find Services</span>
                </Link>
                <Link
                  href="/how-it-works"
                  className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                >
                  How it Works
                </Link>
                <Link
                  href="/become-provider"
                  className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                >
                  Become a Provider
                </Link>
                <div className="hidden lg:block">
                  <TrustBadge type="police_verified" size="sm" />
                </div>
              </div>
            </div>

            {/* Location & Auth */}
            <div className="flex items-center space-x-4">
              <div className="text-muted-foreground hidden items-center space-x-2 text-sm sm:flex">
                <MapPin className="h-4 w-4" />
                <span>{currentLocation?.city}</span>
              </div>
              <ThemeToggle />
              <Link href="/login">
                <Button variant="outline" size="sm" className="hidden md:inline-flex">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="hidden md:inline-flex">
                  Sign Up
                </Button>
              </Link>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-border bg-background border-t md:hidden">
            <div className="space-y-4 px-4 py-4">
              <div className="text-muted-foreground border-border flex items-center space-x-2 border-b pb-4 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Current Location: {currentLocation?.city}</span>
              </div>

              <div className="space-y-2">
                <Link
                  href="/services"
                  className="text-foreground hover:bg-muted flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                >
                  <Search className="h-4 w-4" />
                  <span>Find Services</span>
                </Link>
                <Link
                  href="/how-it-works"
                  className="text-muted-foreground hover:text-foreground hover:bg-muted block rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                >
                  How it Works
                </Link>
                <Link
                  href="/become-provider"
                  className="text-muted-foreground hover:text-foreground hover:bg-muted block rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                >
                  Become a Provider
                </Link>
              </div>

              <div className="border-border space-y-2 border-t pt-4">
                <Link href="/login">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="w-full justify-start">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
