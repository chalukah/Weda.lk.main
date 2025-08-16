'use client'

import { useSession, signOut } from 'next-auth/react'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { User, Settings, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="bg-background min-h-screen">
        <Navbar />
        <main className="pt-16">
          <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
            <div>Loading...</div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!session) {
    return null
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="pt-16">
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
                    <AvatarFallback>{getInitials(session.user?.name || 'User')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{session.user?.name}</h3>
                    <p className="text-muted-foreground text-sm">{session.user?.email}</p>
                    <p className="text-muted-foreground text-xs capitalize">
                      {session.user?.role?.toLowerCase()} Account
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
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
                      {session.user?.verificationStatus?.toLowerCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Account Type:</span>
                    <span className="text-sm font-medium capitalize">
                      {session.user?.role?.toLowerCase()}
                    </span>
                  </div>
                </div>
                {session.user?.verificationStatus === 'UNVERIFIED' && (
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
                {session.user?.role === 'CUSTOMER' ? (
                  <>
                    <Button className="w-full">Find Services</Button>
                    <Button variant="outline" className="w-full">
                      My Bookings
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="w-full">Manage Services</Button>
                    <Button variant="outline" className="w-full">
                      View Bookings
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
                  {session.user?.role === 'CUSTOMER' ? 'booking a service' : 'adding your services'}
                  .
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
