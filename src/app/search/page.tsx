'use client'

import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, MapPin, Filter } from 'lucide-react'

export default function SearchPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">Find Services</h1>
            <p className="text-muted-foreground">Discover trusted service providers in your area</p>
          </div>

          {/* Search Interface */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="mr-2 h-5 w-5" />
                Search for Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Input placeholder="What service do you need?" className="w-full" />
                </div>
                <div>
                  <Input placeholder="Enter your location" className="w-full" />
                </div>
                <Button className="w-full">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Service Categories */}
          <div className="mb-8 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[
              'Home Cleaning',
              'Plumbing',
              'Electrical Work',
              'Carpentry',
              'Painting',
              'Gardening',
              'Pest Control',
              'AC Repair',
              'Appliance Repair',
              'Interior Design',
              'Handyman',
              'Security',
            ].map((service) => (
              <Card key={service} className="cursor-pointer transition-shadow hover:shadow-md">
                <CardContent className="p-4 text-center">
                  <h3 className="font-medium">{service}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Placeholder for Results */}
          <Card>
            <CardContent className="text-muted-foreground py-12 text-center">
              <Search className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <h3 className="mb-2 text-lg font-medium">Start Your Search</h3>
              <p>
                Enter what you're looking for and your location to find trusted service providers.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
