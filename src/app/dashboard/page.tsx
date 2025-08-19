'use client'

import { useSession, signOut } from 'next-auth/react'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { RoleSelection } from '@/components/RoleSelection'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { User, Settings, LogOut, Calendar, Search, Briefcase, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const sessionResult = useSession({
    required: false,
  })
  const router = useRouter()

  // Safe destructuring with fallbacks
  const session = sessionResult?.data || null
  const status = sessionResult?.status || 'loading'

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/en/login')
    }
  }, [status, router])

  // Always render the same structure to avoid hydration mismatches
  const isLoading = status === 'loading'
  const isAuthenticated = status === 'authenticated' && session

  const handleSignOut = () => {
    signOut({ callbackUrl: '/en' })
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  const handleFindServices = () => {
    router.push('/en/search')
  }

  const handleManageServices = () => {
    router.push('/provider/services')
  }

  const handleViewBookings = () => {
    router.push('/bookings')
  }

  const handleEditProfile = () => {
    router.push('/profile/edit')
  }

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="pt-16">
        {isLoading ? (
          <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
            <div>Loading...</div>
          </div>
        ) : !isAuthenticated ? (
          <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
            <div>Please sign in to access your dashboard.</div>
          </div>
        ) : session?.user?.needsRoleSelection ? (
          <div className="min-h-[calc(100vh-4rem)]">
            <RoleSelection />
          </div>
        ) : (
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Welcome back!</h1>
              <p className="text-muted-foreground">Manage your Weda.lk account and services</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Profile Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback>{getInitials(session?.user?.name || 'User')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{session?.user?.name}</h3>
                      <p className="text-muted-foreground text-sm">{session?.user?.email}</p>
                      <p className="text-muted-foreground text-xs capitalize">
                        {session?.user?.role?.toLowerCase()} Account
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" onClick={handleEditProfile}>
                    <Settings className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Account Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Verification Status:</span>
                      <span className="text-sm font-medium capitalize">
                        {session?.user?.verificationStatus?.toLowerCase() || 'verified'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Account Type:</span>
                      <span className="text-sm font-medium capitalize">
                        {session?.user?.role?.toLowerCase() || 'customer'}
                      </span>
                    </div>
                  </div>
                  {session?.user?.verificationStatus === 'UNVERIFIED' && (
                    <Button variant="outline" className="w-full">
                      Complete Verification
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {session?.user?.role === 'CUSTOMER' ? (
                    <>
                      <Button className="w-full" onClick={handleFindServices}>
                        <Search className="mr-2 h-4 w-4" />
                        Find Services
                      </Button>
                      <Button variant="outline" className="w-full" onClick={handleViewBookings}>
                        <Calendar className="mr-2 h-4 w-4" />
                        My Bookings
                      </Button>
                    </>
                  ) : session?.user?.role === 'PROVIDER' ? (
                    <>
                      <Button className="w-full" onClick={handleManageServices}>
                        <Briefcase className="mr-2 h-4 w-4" />
                        Manage Services
                      </Button>
                      <Button variant="outline" className="w-full" onClick={handleViewBookings}>
                        <Calendar className="mr-2 h-4 w-4" />
                        View Bookings
                      </Button>
                    </>
                  ) : session?.user?.role === 'BOTH' ? (
                    <>
                      <Button className="w-full" onClick={handleFindServices}>
                        <Search className="mr-2 h-4 w-4" />
                        Find Services
                      </Button>
                      <Button className="w-full" onClick={handleManageServices}>
                        <Briefcase className="mr-2 h-4 w-4" />
                        Manage Services
                      </Button>
                      <Button variant="outline" className="w-full" onClick={handleViewBookings}>
                        <Calendar className="mr-2 h-4 w-4" />
                        All Bookings
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button className="w-full" onClick={handleFindServices}>
                        <Search className="mr-2 h-4 w-4" />
                        Find Services
                      </Button>
                      <Button variant="outline" className="w-full" onClick={handleViewBookings}>
                        <Calendar className="mr-2 h-4 w-4" />
                        My Bookings
                      </Button>
                    </>
                  )}
                  <Button variant="destructive" className="w-full" onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground py-8 text-center">
                  <p>No recent activity to show.</p>
                  <p className="text-sm">
                    Start by{' '}
                    {session?.user?.role === 'CUSTOMER'
                      ? 'booking a service'
                      : 'adding your services'}
                    .
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
