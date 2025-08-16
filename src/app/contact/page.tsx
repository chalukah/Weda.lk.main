import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 text-4xl font-bold md:text-6xl">
                Contact <span className="text-primary">වැඩ.lk</span>
              </h1>
              <p className="text-muted-foreground mb-8 text-xl">
                Get in touch with our team. We're here to help with any questions or concerns.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">First Name</label>
                        <input
                          type="text"
                          placeholder="John"
                          className="border-input bg-background ring-offset-background focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Last Name</label>
                        <input
                          type="text"
                          placeholder="Doe"
                          className="border-input bg-background ring-offset-background focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="border-input bg-background ring-offset-background focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <input
                        type="text"
                        placeholder="How can we help?"
                        className="border-input bg-background ring-offset-background focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message</label>
                      <textarea
                        rows={4}
                        placeholder="Tell us more about your inquiry..."
                        className="border-input bg-background ring-offset-background focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Get in Touch</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <Mail className="text-primary mt-1 h-6 w-6" />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-muted-foreground">info@weda.lk</p>
                        <p className="text-muted-foreground">support@weda.lk</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Phone className="text-primary mt-1 h-6 w-6" />
                      <div>
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-muted-foreground">+94 11 234 5678</p>
                        <p className="text-muted-foreground">+94 77 123 4567</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <MapPin className="text-primary mt-1 h-6 w-6" />
                      <div>
                        <h3 className="font-medium">Address</h3>
                        <p className="text-muted-foreground">
                          123 Galle Road
                          <br />
                          Colombo 03
                          <br />
                          Sri Lanka
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Clock className="text-primary mt-1 h-6 w-6" />
                      <div>
                        <h3 className="font-medium">Business Hours</h3>
                        <p className="text-muted-foreground">
                          Monday - Friday: 9:00 AM - 6:00 PM
                          <br />
                          Saturday: 9:00 AM - 2:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Need immediate assistance? Check out our help center or join our community.
                    </p>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        Help Center
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        FAQ
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
