import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, CardContent, CardTitle } from '@/components/ui/card'

export default function PrivacyPage() {
  return (
    <div className="bg-background min-h-screen" suppressHydrationWarning>
      <Navbar />

      <main className="pt-16 pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-8 text-center text-4xl font-bold">Privacy Policy</h1>

            <Card>
              <CardContent className="space-y-6 p-8">
                <section>
                  <CardTitle className="mb-4 text-xl">1. Information We Collect</CardTitle>
                  <p className="text-muted-foreground">
                    We collect information you provide directly to us, such as when you create an
                    account, book services, or contact us for support.
                  </p>
                </section>

                <section>
                  <CardTitle className="mb-4 text-xl">2. How We Use Your Information</CardTitle>
                  <p className="text-muted-foreground">
                    We use your information to provide, maintain, and improve our services, process
                    transactions, and communicate with you about your account and our services.
                  </p>
                </section>

                <section>
                  <CardTitle className="mb-4 text-xl">3. Information Sharing</CardTitle>
                  <p className="text-muted-foreground">
                    We share your information with service providers only as necessary to facilitate
                    your bookings. We do not sell your personal information to third parties.
                  </p>
                </section>

                <section>
                  <CardTitle className="mb-4 text-xl">4. Data Security</CardTitle>
                  <p className="text-muted-foreground">
                    We implement appropriate security measures to protect your personal information
                    against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </section>

                <section>
                  <CardTitle className="mb-4 text-xl">5. Your Rights</CardTitle>
                  <p className="text-muted-foreground">
                    You have the right to access, update, or delete your personal information. You
                    can also opt out of certain communications from us.
                  </p>
                </section>

                <section>
                  <CardTitle className="mb-4 text-xl">6. Cookies</CardTitle>
                  <p className="text-muted-foreground">
                    We use cookies and similar technologies to improve your experience on our
                    platform and to understand how our services are used.
                  </p>
                </section>

                <section>
                  <CardTitle className="mb-4 text-xl">7. Updates to This Policy</CardTitle>
                  <p className="text-muted-foreground">
                    We may update this privacy policy from time to time. We will notify you of any
                    changes by posting the new policy on this page.
                  </p>
                </section>

                <section>
                  <CardTitle className="mb-4 text-xl">8. Contact Us</CardTitle>
                  <p className="text-muted-foreground">
                    If you have questions about this privacy policy, please contact us at
                    privacy@weda.lk
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
