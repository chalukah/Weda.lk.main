'use client'

import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageToggle } from '@/components/language-toggle'
import { Location } from '@/components/LocationPicker'
import { useState, useEffect } from 'react'
import { allCities, getLocationData } from '@/lib/locations'
import { Menu, X, MapPin, Search, LogOut, User, Settings } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import NextLink from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function Navbar() {
  const sessionResult = useSession()

  // Safe destructuring with fallbacks
  const session = sessionResult?.data || null
  const status = sessionResult?.status || 'loading'

  const t = useTranslations('navbar')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null)
  const [mounted, setMounted] = useState(false)

  // Ensure client-side rendering consistency
  useEffect(() => {
    setMounted(true)
    // Set default location after mounting
    setCurrentLocation({
      address: 'Colombo, Sri Lanka',
      city: 'Colombo',
      district: 'Colombo',
    })
  }, [])

  // Auto-detect location on component mount (only after mounting)
  useEffect(() => {
    if (!mounted) return

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
        // For now, set a detected location in Colombo area
        const detectedCity = 'Colombo' // In real app, this would come from reverse geocoding
        const locationData = getLocationData(detectedCity)

        setCurrentLocation({
          address: `Current Location, ${detectedCity}`,
          city: locationData.city,
          district: locationData.district,
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        })
      } catch {
        // Keep default Colombo location if detection fails
      }
    }

    detectLocation()
  }, [mounted])

  // Default location for SSR consistency
  const defaultLocation = {
    address: 'Colombo, Sri Lanka',
    city: 'Colombo',
    district: 'Colombo',
  }

  const displayLocation = mounted ? currentLocation : defaultLocation

  // Prevent hydration mismatch for translated content
  if (!mounted) {
    return (
      <nav className="border-border bg-background/80 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.png" alt="වැඩ.lk Logo" width={36} height={36} className="rounded" />
              <span
                className="text-foreground text-xl font-extrabold tracking-tight"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif', lineHeight: '1.2' }}
              >
                වැඩ.lk
              </span>
            </Link>

            {/* Placeholder content during SSR */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
                <div className="bg-muted h-6 w-24 animate-pulse rounded" />
                <div className="bg-muted h-6 w-20 animate-pulse rounded" />
                <div className="bg-muted h-6 w-28 animate-pulse rounded" />
              </div>
            </div>

            {/* Right side placeholder */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="bg-muted h-9 w-9 animate-pulse rounded" />
              <div className="bg-muted h-9 w-9 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className="border-border bg-background/80 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md"
        suppressHydrationWarning
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/logo.png"
                  alt="වැඩ.lk Logo"
                  width={32}
                  height={32}
                  className="rounded"
                />
                <span
                  className="text-foreground text-lg font-extrabold tracking-tight lg:text-xl"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif', lineHeight: '1.2' }}
                >
                  වැඩ.lk
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden flex-1 justify-center md:flex" suppressHydrationWarning>
              <div className="flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
                <Link
                  href="/services"
                  className="text-foreground/80 hover:text-foreground flex items-center space-x-2 text-sm font-bold whitespace-nowrap transition-colors lg:text-base"
                >
                  <Search className="h-4 w-4 flex-shrink-0 lg:h-5 lg:w-5" />
                  <span
                    className="leading-relaxed font-bold tracking-wide"
                    suppressHydrationWarning
                  >
                    {t('findServices')}
                  </span>
                </Link>
                <Link
                  href="/how-it-works"
                  className="text-foreground/80 hover:text-foreground text-sm leading-relaxed font-bold tracking-wide whitespace-nowrap transition-colors lg:text-base"
                  suppressHydrationWarning
                >
                  {t('howItWorks')}
                </Link>
                <Link
                  href="/become-provider"
                  className="text-foreground/80 hover:text-foreground text-sm leading-relaxed font-bold tracking-wide whitespace-nowrap transition-colors lg:text-base"
                  suppressHydrationWarning
                >
                  {t('becomeProvider')}
                </Link>
              </div>
            </div>

            {/* Location & Auth */}
            <div className="flex flex-shrink-0 items-center space-x-4" suppressHydrationWarning>
              <button
                className="text-foreground/70 hover:text-foreground hidden items-center space-x-2 text-sm font-bold whitespace-nowrap transition-colors sm:flex lg:text-base"
                suppressHydrationWarning
                onClick={() => {
                  // In future, could open location picker modal
                  console.log('Location picker clicked')
                }}
              >
                <MapPin className="h-4 w-4 flex-shrink-0 lg:h-5 lg:w-5" />
                <span className="leading-relaxed font-bold">
                  {displayLocation?.city || 'Colombo'}
                </span>
              </button>
              <LanguageToggle />
              <ThemeToggle />

              {/* Authentication Section */}
              {status === 'loading' ? (
                <div className="bg-muted h-8 w-8 animate-pulse rounded-full" />
              ) : session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={session.user?.image || ''}
                          alt={session.user?.name || 'User'}
                        />
                        <AvatarFallback>
                          {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        {session.user?.name && <p className="font-medium">{session.user.name}</p>}
                        {session.user?.email && (
                          <p className="text-muted-foreground w-[200px] truncate text-sm">
                            {session.user.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <NextLink href="/dashboard" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        {t('dashboard')}
                      </NextLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <NextLink href="/profile" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        {t('profile')}
                      </NextLink>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={() => signOut({ callbackUrl: '/' })}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {t('logOut')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="hidden px-3 text-sm font-bold whitespace-nowrap md:inline-flex lg:px-4 lg:text-base"
                    >
                      <span className="leading-relaxed font-bold">{t('login')}</span>
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="hidden px-3 text-sm font-bold whitespace-nowrap md:inline-flex lg:px-4 lg:text-base">
                      <span className="leading-relaxed font-bold">{t('signUp')}</span>
                    </Button>
                  </Link>
                </>
              )}

              {/* Mobile menu button */}
              <Button
                variant="ghost"
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
          <div className="border-border bg-background border-t md:hidden" suppressHydrationWarning>
            <div className="space-y-4 px-4 py-4">
              <button
                className="text-foreground/70 hover:text-foreground border-border flex w-full items-center space-x-3 border-b pb-4 text-left text-base font-bold transition-colors"
                suppressHydrationWarning
                onClick={() => {
                  // In future, could open location picker modal
                  console.log('Location picker clicked')
                }}
              >
                <MapPin className="h-5 w-5 flex-shrink-0" />
                <span className="leading-relaxed font-bold tracking-wide">
                  {t('currentLocation')}: {displayLocation?.city || 'Colombo'}
                </span>
              </button>

              <div className="space-y-2">
                <Link
                  href="/services"
                  className="text-foreground hover:bg-muted flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-base font-bold transition-colors"
                >
                  <Search className="h-5 w-5 flex-shrink-0" />
                  <span className="leading-relaxed font-bold tracking-wide">
                    {t('findServices')}
                  </span>
                </Link>
                <Link
                  href="/how-it-works"
                  className="text-foreground/80 hover:text-foreground hover:bg-muted block w-full rounded-lg px-4 py-3 text-base leading-relaxed font-bold tracking-wide transition-colors"
                >
                  {t('howItWorks')}
                </Link>
                <Link
                  href="/become-provider"
                  className="text-foreground/80 hover:text-foreground hover:bg-muted block w-full rounded-lg px-4 py-3 text-base leading-relaxed font-bold tracking-wide transition-colors"
                >
                  {t('becomeProvider')}
                </Link>
              </div>

              <div className="border-border space-y-2 border-t pt-4">
                {status === 'loading' ? (
                  <div className="bg-muted h-8 w-full animate-pulse rounded" />
                ) : session ? (
                  <>
                    <div className="flex items-center space-x-3 px-3 py-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={session.user?.image || ''}
                          alt={session.user?.name || 'User'}
                        />
                        <AvatarFallback>
                          {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium">{session.user?.name}</p>
                        <p className="text-muted-foreground text-xs">{session.user?.email}</p>
                      </div>
                    </div>
                    <NextLink href="/dashboard">
                      <Button variant="outline" className="w-full justify-start py-3 text-base">
                        <User className="mr-3 h-4 w-4 flex-shrink-0" />
                        <span className="leading-relaxed tracking-wide">{t('dashboard')}</span>
                      </Button>
                    </NextLink>
                    <NextLink href="/profile">
                      <Button variant="outline" className="w-full justify-start py-3 text-base">
                        <Settings className="mr-3 h-4 w-4 flex-shrink-0" />
                        <span className="leading-relaxed tracking-wide">{t('profile')}</span>
                      </Button>
                    </NextLink>
                    <Button
                      variant="outline"
                      className="w-full justify-start py-3 text-base"
                      onClick={() => signOut({ callbackUrl: '/' })}
                    >
                      <LogOut className="mr-3 h-4 w-4 flex-shrink-0" />
                      <span className="leading-relaxed tracking-wide">{t('logOut')}</span>
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button
                        variant="outline"
                        className="w-full justify-start py-3 text-base font-bold"
                      >
                        <span className="leading-relaxed font-bold tracking-wide">
                          {t('login')}
                        </span>
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button className="w-full justify-start py-3 text-base font-bold">
                        <span className="leading-relaxed font-bold tracking-wide">
                          {t('signUp')}
                        </span>
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
