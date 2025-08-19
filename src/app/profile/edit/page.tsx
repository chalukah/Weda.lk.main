'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const dynamic = 'force-dynamic'

import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { User, Mail, Phone, MapPin, Camera } from 'lucide-react'

export default function EditProfilePage() {
  const sessionResult = useSession({
    required: false,
  })
  const router = useRouter()

  // Safe destructuring with fallbacks
  const session = sessionResult?.data || null
  const status = sessionResult?.status || 'loading'

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

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

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="pt-16">
        <div className="container mx-auto max-w-2xl px-4 py-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">Edit Profile</h1>
            <p className="text-muted-foreground">
              Update your personal information and preferences
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-lg">
                    {getInitials(session?.user?.name || 'User')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    <Camera className="mr-2 h-4 w-4" />
                    Change Photo
                  </Button>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Recommended: Square image, at least 200x200px
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    defaultValue={session?.user?.name?.split(' ')[0] || ''}
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    defaultValue={session?.user?.name?.split(' ').slice(1).join(' ') || ''}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10"
                    defaultValue={session?.user?.email || ''}
                    disabled
                  />
                </div>
                <p className="text-muted-foreground mt-1 text-xs">
                  Email cannot be changed for security reasons
                </p>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                  <Input id="phone" type="tel" className="pl-10" placeholder="+94 77 123 4567" />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                  <Input id="address" className="pl-10" placeholder="Enter your address" />
                </div>
              </div>

              {/* Account Settings */}
              <div className="border-t pt-6">
                <h3 className="mb-4 font-medium">Account Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Account Type</p>
                      <p className="text-muted-foreground text-sm">
                        {session?.user?.role || 'Customer'}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change Role
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-muted-foreground text-sm">
                        Receive updates about your bookings
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-6">
                <Button className="flex-1">Save Changes</Button>
                <Button variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
