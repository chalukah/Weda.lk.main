import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Target, Shield, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 text-4xl font-bold md:text-6xl">
                About <span className="text-primary">වැඩ.lk</span>
              </h1>
              <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
                Sri Lanka's premier service marketplace, connecting customers with trusted service
                providers across the island with innovative technology and exceptional service.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <Target className="text-primary mb-4 h-12 w-12" />
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To revolutionize how Sri Lankans access services by creating a trusted,
                    transparent, and efficient marketplace that benefits both customers and service
                    providers.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Award className="text-primary mb-4 h-12 w-12" />
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To become the leading platform for service discovery and booking in Sri Lanka,
                    empowering local businesses and making quality services accessible to everyone.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Our Values</h2>
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
              <Card className="text-center">
                <CardHeader>
                  <Shield className="text-primary mx-auto mb-4 h-12 w-12" />
                  <CardTitle>Trust & Safety</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All service providers are verified and reviewed to ensure quality and
                    reliability for our customers.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Users className="text-primary mx-auto mb-4 h-12 w-12" />
                  <CardTitle>Community First</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We support local businesses and create opportunities for skilled professionals
                    across Sri Lanka.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Target className="text-primary mx-auto mb-4 h-12 w-12" />
                  <CardTitle>Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We strive for excellence in every interaction, ensuring exceptional experiences
                    for all platform users.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Our Story</h2>
            <div className="mx-auto max-w-4xl">
              <Card>
                <CardContent className="p-8">
                  <p className="text-muted-foreground mb-6 text-lg">
                    වැඩ.lk was founded with a simple idea: to make finding and booking quality
                    services in Sri Lanka as easy as a few clicks. We recognized that both customers
                    and service providers faced challenges in connecting with each other.
                  </p>
                  <p className="text-muted-foreground mb-6 text-lg">
                    Customers struggled to find reliable service providers, while skilled
                    professionals had difficulty reaching potential clients. We built වැඩ.lk to
                    bridge this gap with technology, creating a platform that benefits everyone.
                  </p>
                  <p className="text-muted-foreground text-lg">
                    Today, we're proud to connect thousands of customers with verified service
                    providers across Sri Lanka, from home cleaning and repairs to beauty services
                    and professional consultations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
