'use client'

import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Location } from '@/components/LocationPicker'
import { useState, useEffect } from 'react'
import { Menu, X, MapPin, Search, LogOut, User, Settings } from 'lucide-react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function Navbar() {
  const { data: session, status } = useSession()
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
        setCurrentLocation({
          address: 'Current Location, Colombo',
          city: 'Colombo',
          district: 'Colombo',
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

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="border-border bg-background/80 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-primary flex h-9 w-9 items-center justify-center rounded">
                <span className="text-primary-foreground text-xs leading-none font-bold tracking-tight">
                  වැඩ
                </span>
              </div>
              <span className="text-foreground text-xl font-bold">වැඩ.lk</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-foreground flex items-center space-x-1 text-base font-medium transition-colors"
                >
                  <Search className="h-5 w-5" />
                  <span>Find Services</span>
                </Link>
                <Link
                  href="/how-it-works"
                  className="text-muted-foreground hover:text-foreground text-base font-medium transition-colors"
                >
                  How it Works
                </Link>
                <Link
                  href="/become-provider"
                  className="text-muted-foreground hover:text-foreground text-base font-medium transition-colors"
                >
                  Become a Provider
                </Link>
              </div>
            </div>

            {/* Location & Auth */}
            <div className="flex items-center space-x-4">
              <div className="text-muted-foreground hidden items-center space-x-2 text-base sm:flex">
                <MapPin className="h-5 w-5" />
                <span>{currentLocation?.city || 'Colombo'}</span>
              </div>
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
                      <Link href="/dashboard" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={() => signOut({ callbackUrl: '/' })}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" className="hidden text-base md:inline-flex">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="hidden text-base md:inline-flex">Sign Up</Button>
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
          <div className="border-border bg-background border-t md:hidden">
            <div className="space-y-4 px-4 py-4">
              <div className="text-muted-foreground border-border flex items-center space-x-2 border-b pb-4 text-base">
                <MapPin className="h-5 w-5" />
                <span>Current Location: {currentLocation?.city || 'Colombo'}</span>
              </div>

              <div className="space-y-2">
                <Link
                  href="/services"
                  className="text-foreground hover:bg-muted flex items-center space-x-3 rounded-lg px-3 py-2 text-base font-medium transition-colors"
                >
                  <Search className="h-5 w-5" />
                  <span>Find Services</span>
                </Link>
                <Link
                  href="/how-it-works"
                  className="text-muted-foreground hover:text-foreground hover:bg-muted block rounded-lg px-3 py-2 text-base font-medium transition-colors"
                >
                  How it Works
                </Link>
                <Link
                  href="/become-provider"
                  className="text-muted-foreground hover:text-foreground hover:bg-muted block rounded-lg px-3 py-2 text-base font-medium transition-colors"
                >
                  Become a Provider
                </Link>
              </div>

              <div className="border-border space-y-2 border-t pt-4">
                {session ? (
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
                    <Link href="/dashboard">
                      <Button variant="outline" className="w-full justify-start text-base">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Button>
                    </Link>
                    <Link href="/profile">
                      <Button variant="outline" className="w-full justify-start text-base">
                        <Settings className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-base"
                      onClick={() => signOut({ callbackUrl: '/' })}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="outline" className="w-full justify-start text-base">
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button className="w-full justify-start text-base">Sign Up</Button>
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
