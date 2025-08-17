'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
  Users,
  Star,
  TrendingUp,
  Calendar,
  Home,
} from 'lucide-react'

export default function ProviderDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (!session) {
      router.push('/auth/signin')
      return
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border-primary h-32 w-32 animate-spin rounded-full border-b-2"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const applicationStatus = {
    status: 'under_review',
    submittedAt: new Date().toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    estimatedCompletion: '2-3 business days',
    steps: [
      { name: 'Application Submitted', completed: true, current: false },
      { name: 'Document Verification', completed: false, current: true },
      { name: 'Background Check', completed: false, current: false },
      { name: 'Profile Activation', completed: false, current: false },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5" />
      case 'under_review':
        return <Clock className="h-5 w-5" />
      case 'rejected':
        return <AlertCircle className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50" suppressHydrationWarning>
      <Navbar />

      <main className="pt-16 pb-16">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Provider Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Welcome back, {session.user?.name || session.user?.email}
            </p>
          </div>

          {/* Application Status */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  {getStatusIcon(applicationStatus.status)}
                  <span>Application Status</span>
                </CardTitle>
                <Badge className={getStatusColor(applicationStatus.status)}>
                  {applicationStatus.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg bg-blue-50 p-4">
                  <h3 className="mb-2 font-semibold text-blue-900">
                    Application Submitted Successfully!
                  </h3>
                  <p className="text-sm text-blue-700">
                    Submitted on {applicationStatus.submittedAt} • Estimated completion:{' '}
                    {applicationStatus.estimatedCompletion}
                  </p>
                </div>

                {/* Progress Steps */}
                <div className="space-y-4">
                  {applicationStatus.steps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                          step.completed
                            ? 'bg-green-100 text-green-600'
                            : step.current
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <span className="text-sm font-bold">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4
                          className={`font-medium ${
                            step.completed || step.current ? 'text-gray-900' : 'text-gray-500'
                          }`}
                        >
                          {step.name}
                        </h4>
                        {step.current && (
                          <p className="text-sm text-blue-600">Currently in progress...</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats (Placeholder for future) */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="mx-auto mb-2 h-8 w-8 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Profile Views</h3>
                <p className="text-2xl font-bold text-blue-600">-</p>
                <p className="text-sm text-gray-500">Available after approval</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Star className="mx-auto mb-2 h-8 w-8 text-yellow-600" />
                <h3 className="font-semibold text-gray-900">Rating</h3>
                <p className="text-2xl font-bold text-yellow-600">-</p>
                <p className="text-sm text-gray-500">Available after first job</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="mx-auto mb-2 h-8 w-8 text-green-600" />
                <h3 className="font-semibold text-gray-900">Earnings</h3>
                <p className="text-2xl font-bold text-green-600">Rs. 0</p>
                <p className="text-sm text-gray-500">This month</p>
              </CardContent>
            </Card>
          </div>

          {/* What's Next */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>What's Next?</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <h3 className="mb-2 font-semibold text-yellow-800">📧 Check Your Email</h3>
                  <p className="text-sm text-yellow-700">
                    We've sent you a confirmation email with important information. Please check
                    your inbox and spam folder.
                  </p>
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <h3 className="mb-2 font-semibold text-blue-800">📞 We May Contact You</h3>
                  <p className="text-sm text-blue-700">
                    Our verification team may contact you for additional information or
                    clarification on your documents.
                  </p>
                </div>

                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <h3 className="mb-2 font-semibold text-green-800">🎯 Get Ready to Serve</h3>
                  <p className="text-sm text-green-700">
                    Once approved, you'll be able to create your service listings and start
                    receiving bookings immediately.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Our support team is here to help you throughout the verification process.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>📧</span>
                    <span>support@weda.lk</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>📞</span>
                    <span>+94 77 123 4567</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>⏰</span>
                    <span>Mon-Fri 9AM-6PM</span>
                  </div>
                </div>
                <Button variant="outline" onClick={() => router.push('/')}>
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
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
