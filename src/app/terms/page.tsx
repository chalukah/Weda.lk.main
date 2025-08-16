import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, CardContent, CardTitle } from '@/components/ui/card'

export default function TermsPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="pt-16 pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-8 text-center text-4xl font-bold">Terms of Service</h1>

            <Card>
              <CardContent className="space-y-6 p-8">
                <section>
                  <CardTitle className="mb-4 text-xl">1. Acceptance of Terms</CardTitle>
                  <p className="text-muted-foreground">
                    By accessing and using වැඩ.lk, you accept and agree to be bound by the terms and
                    provision of this agreement.
                  </p>
                </section>

                <section>
                  <CardTitle className="mb-4 text-xl">2. Service Description</CardTitle>
                  <p className="text-muted-foreground">
                    වැඩ.lk is a marketplace platform that connects customers with service providers.
                    We facilitate bookings but are not responsible for the actual service delivery.
                  </p>
                </section>

                <section>
                  <CardTitle className="mb-4 text-xl">3. User Responsibilities</CardTitle>
                  <p className="text-muted-foreground">
                    Users must provide accurate information, treat others with respect, and comply
                    with all applicable laws and regulations.
                  </p>
                </section>

                <section>
                  <CardTitle className="mb-4 text-xl">4. Payment Terms</CardTitle>
                  <p className="text-muted-foreground">
                    Payment processing is handled securely through our platform. Service providers
                    are responsible for service taxes and commissions as applicable.
                  </p>
                </section>

                <section>
                  <CardTitle className="mb-4 text-xl">5. Limitation of Liability</CardTitle>
                  <p className="text-muted-foreground">
                    වැඩ.lk is not liable for any damages arising from the use of our platform or
                    services provided by third-party service providers.
                  </p>
                </section>

                <section>
                  <CardTitle className="mb-4 text-xl">6. Governing Law</CardTitle>
                  <p className="text-muted-foreground">
                    These terms are governed by the laws of Sri Lanka. Any disputes will be resolved
                    in Sri Lankan courts.
                  </p>
                </section>

                <section>
                  <CardTitle className="mb-4 text-xl">7. Contact Information</CardTitle>
                  <p className="text-muted-foreground">
                    For questions about these terms, please contact us at legal@weda.lk
                  </p>
                </section>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
