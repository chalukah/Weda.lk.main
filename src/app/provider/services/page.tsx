import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Briefcase, Plus, Settings, Eye } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ProviderServicesPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  if (session.user?.role === 'CUSTOMER') {
    redirect('/dashboard')
  }

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">My Services</h1>
            <p className="text-muted-foreground">
              Manage your service offerings and track performance
            </p>
          </div>

          {/* Add Service Button */}
          <div className="mb-6">
            <Button className="w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add New Service
            </Button>
          </div>

          {/* Services Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Empty State */}
            <Card className="md:col-span-2 lg:col-span-3">
              <CardContent className="text-muted-foreground py-12 text-center">
                <Briefcase className="mx-auto mb-4 h-12 w-12 opacity-50" />
                <h3 className="mb-2 text-lg font-medium">No Services Added Yet</h3>
                <p className="mb-4">
                  Start by adding your first service offering to attract customers.
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Service
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Service Categories */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Popular Service Categories</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {[
                  'Home Cleaning',
                  'Plumbing',
                  'Electrical Work',
                  'Gardening',
                  'Tutoring',
                  'Delivery Services',
                  'Photography',
                  'Event Planning',
                  'Repair Services',
                ].map((category) => (
                  <Badge key={category} variant="outline" className="justify-center py-2">
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
