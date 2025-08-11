import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Search, MapPin, Filter, Star, Shield, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ServicesPage() {
  const serviceCategories = [
    { name: 'Plumbing', icon: '🔧', count: 45 },
    { name: 'Electrical', icon: '⚡', count: 38 },
    { name: 'Cleaning', icon: '🧽', count: 62 },
    { name: 'Gardening', icon: '🌱', count: 29 },
    { name: 'Carpentry', icon: '🔨', count: 33 },
    { name: 'Painting', icon: '🎨', count: 41 }
  ]

  const featuredProviders = [
    {
      id: 1,
      name: 'Nimal Silva',
      service: 'Plumbing',
      rating: 4.9,
      reviews: 127,
      verified: true,
      distance: '2.1 km',
      price: 'Rs. 2,500/hour',
      image: '/api/placeholder/150/150'
    },
    {
      id: 2,
      name: 'Kamala Perera',
      service: 'House Cleaning',
      rating: 4.8,
      reviews: 89,
      verified: true,
      distance: '1.8 km',
      price: 'Rs. 1,200/hour',
      image: '/api/placeholder/150/150'
    },
    {
      id: 3,
      name: 'Sunil Fernando',
      service: 'Electrical',
      rating: 4.7,
      reviews: 156,
      verified: true,
      distance: '3.2 km',
      price: 'Rs. 3,000/hour',
      image: '/api/placeholder/150/150'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        {/* Header Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Find Verified Service Providers
              </h1>
              <p className="mt-4 text-xl text-muted-foreground">
                Connect with police-verified professionals in your area
              </p>
            </div>

            {/* Search Bar */}
            <div className="mt-8 flex max-w-2xl mx-auto">
              <div className="flex flex-1 items-center space-x-2 rounded-l-lg border border-r-0 bg-background px-4 py-3">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="What service do you need?"
                  className="flex-1 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <div className="flex items-center space-x-2 border border-l-0 border-r-0 bg-background px-4 py-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Colombo"
                  className="w-32 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <Button className="rounded-l-none">
                Search
              </Button>
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Popular Services
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Browse by category to find the right professional
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
              {serviceCategories.map((category) => (
                <Card key={category.name} className="cursor-pointer transition-all hover:shadow-md hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="font-semibold text-foreground">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} providers</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Providers */}
        <section className="py-16 bg-muted/20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  Top Rated Providers
                </h2>
                <p className="mt-2 text-lg text-muted-foreground">
                  Highly rated professionals in your area
                </p>
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProviders.map((provider) => (
                <Card key={provider.id} className="cursor-pointer transition-all hover:shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-start space-x-4">
                      <div className="h-16 w-16 rounded-full bg-muted"></div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <CardTitle className="text-lg">{provider.name}</CardTitle>
                          {provider.verified && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              <Shield className="mr-1 h-3 w-3" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{provider.service}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{provider.rating}</span>
                          <span className="text-sm text-muted-foreground">({provider.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{provider.distance}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Available today</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-semibold text-foreground">{provider.price}</span>
                      <Button>Book Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}