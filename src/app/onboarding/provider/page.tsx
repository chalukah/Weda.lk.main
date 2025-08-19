'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export const dynamic = 'force-dynamic'

import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, CheckCircle, MapPin, Phone, Mail, User, Briefcase } from 'lucide-react'

interface ProviderOnboardingData {
  businessName: string
  description: string
  phone: string
  services: string[]
  serviceAreas: string[]
  experience: string
  certifications: string
  languages: string[]
}

export default function ProviderOnboardingPage() {
  const sessionResult = useSession({ required: false })
  const router = useRouter()

  // Safe destructuring with fallbacks
  const session = sessionResult?.data || null
  const status = sessionResult?.status || 'loading'
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<ProviderOnboardingData>({
    businessName: '',
    description: '',
    phone: '',
    services: [],
    serviceAreas: [],
    experience: '',
    certifications: '',
    languages: ['English'],
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  const serviceCategories = [
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
    'Handyman Services',
    'Security Systems',
    'Tutoring',
    'Beauty Services',
    'Catering',
  ]

  const sriLankanDistricts = [
    'Colombo',
    'Gampaha',
    'Kalutara',
    'Kandy',
    'Matale',
    'Nuwara Eliya',
    'Galle',
    'Matara',
    'Hambantota',
    'Jaffna',
    'Kilinochchi',
    'Mannar',
    'Mullaitivu',
    'Vavuniya',
    'Puttalam',
    'Kurunegala',
    'Anuradhapura',
    'Polonnaruwa',
    'Badulla',
    'Monaragala',
    'Ratnapura',
    'Kegalle',
    'Ampara',
    'Batticaloa',
    'Trincomalee',
  ]

  const languages = ['English', 'Sinhala', 'Tamil']

  const updateFormData = (field: keyof ProviderOnboardingData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item) ? array.filter((i) => i !== item) : [...array, item]
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/provider/onboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userEmail: session?.user?.email,
        }),
      })

      if (response.ok) {
        router.push('/dashboard?onboarding=success')
      } else {
        console.error('Failed to complete onboarding')
      }
    } catch (error) {
      console.error('Error during onboarding:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const steps = [
    {
      title: 'Business Information',
      description: 'Tell us about your business',
    },
    {
      title: 'Services & Areas',
      description: 'What services do you offer and where?',
    },
    {
      title: 'Experience & Skills',
      description: 'Share your expertise and qualifications',
    },
    {
      title: 'Review & Submit',
      description: 'Review your information and submit',
    },
  ]

  if (status === 'loading') {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="pt-16">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          {/* Progress Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">Provider Onboarding</h1>
            <p className="text-muted-foreground">
              Complete your profile to start offering services on Weda.lk
            </p>

            <div className="mt-6 flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                      index + 1 <= currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index + 1 < currentStep ? <CheckCircle className="h-5 w-5" /> : index + 1}
                  </div>
                  <div className="ml-2 hidden sm:block">
                    <p className="text-sm font-medium">{step.title}</p>
                    <p className="text-muted-foreground text-xs">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && <div className="mx-4 h-0.5 w-8 bg-gray-200" />}
                </div>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {currentStep === 1 && <Briefcase className="mr-2" />}
                {currentStep === 2 && <MapPin className="mr-2" />}
                {currentStep === 3 && <User className="mr-2" />}
                {currentStep === 4 && <CheckCircle className="mr-2" />}
                {steps[currentStep - 1]?.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Business Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => updateFormData('businessName', e.target.value)}
                      placeholder="e.g., ABC Home Services"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Business Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => updateFormData('description', e.target.value)}
                      placeholder="Describe your business, experience, and what makes you unique..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      placeholder="+94 77 123 4567"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Services & Areas */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label>Services You Offer *</Label>
                    <p className="text-muted-foreground mb-3 text-sm">
                      Select all services you can provide
                    </p>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                      {serviceCategories.map((service) => (
                        <div key={service} className="flex items-center space-x-2">
                          <Checkbox
                            id={service}
                            checked={formData.services.includes(service)}
                            onCheckedChange={() =>
                              updateFormData(
                                'services',
                                toggleArrayItem(formData.services, service)
                              )
                            }
                          />
                          <Label htmlFor={service} className="text-sm">
                            {service}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Service Areas *</Label>
                    <p className="text-muted-foreground mb-3 text-sm">
                      Select districts where you can provide services
                    </p>
                    <div className="grid max-h-48 grid-cols-2 gap-2 overflow-y-auto md:grid-cols-3">
                      {sriLankanDistricts.map((district) => (
                        <div key={district} className="flex items-center space-x-2">
                          <Checkbox
                            id={district}
                            checked={formData.serviceAreas.includes(district)}
                            onCheckedChange={() =>
                              updateFormData(
                                'serviceAreas',
                                toggleArrayItem(formData.serviceAreas, district)
                              )
                            }
                          />
                          <Label htmlFor={district} className="text-sm">
                            {district}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Experience & Skills */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <Input
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => updateFormData('experience', e.target.value)}
                      placeholder="e.g., 5 years"
                    />
                  </div>

                  <div>
                    <Label htmlFor="certifications">Certifications & Qualifications</Label>
                    <Textarea
                      id="certifications"
                      value={formData.certifications}
                      onChange={(e) => updateFormData('certifications', e.target.value)}
                      placeholder="List any relevant certifications, licenses, or qualifications..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Languages You Speak</Label>
                    <p className="text-muted-foreground mb-3 text-sm">
                      Select all languages you're comfortable communicating in
                    </p>
                    <div className="flex gap-2">
                      {languages.map((language) => (
                        <div key={language} className="flex items-center space-x-2">
                          <Checkbox
                            id={language}
                            checked={formData.languages.includes(language)}
                            onCheckedChange={() =>
                              updateFormData(
                                'languages',
                                toggleArrayItem(formData.languages, language)
                              )
                            }
                          />
                          <Label htmlFor={language}>{language}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="rounded-lg bg-green-50 p-4">
                    <h3 className="mb-2 font-semibold text-green-800">Review Your Information</h3>
                    <p className="text-sm text-green-700">
                      Please review all the information below before submitting your application.
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 font-semibold">Business Information</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Business Name:</strong> {formData.businessName}
                        </p>
                        <p>
                          <strong>Phone:</strong> {formData.phone}
                        </p>
                        <p>
                          <strong>Description:</strong> {formData.description}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 font-semibold">Services</h4>
                      <div className="mb-4 flex flex-wrap gap-1">
                        {formData.services.map((service) => (
                          <Badge key={service} variant="secondary">
                            {service}
                          </Badge>
                        ))}
                      </div>

                      <h4 className="mb-2 font-semibold">Service Areas</h4>
                      <div className="flex flex-wrap gap-1">
                        {formData.serviceAreas.map((area) => (
                          <Badge key={area} variant="outline">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold">Experience & Skills</h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Experience:</strong> {formData.experience}
                      </p>
                      <p>
                        <strong>Languages:</strong> {formData.languages.join(', ')}
                      </p>
                      {formData.certifications && (
                        <p>
                          <strong>Certifications:</strong> {formData.certifications}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="rounded-lg bg-yellow-50 p-4">
                    <h4 className="mb-2 font-semibold text-yellow-800">Next Steps</h4>
                    <p className="text-sm text-yellow-700">
                      After submitting, our team will review your application and verify your
                      credentials. This process typically takes 2-3 business days. You'll receive an
                      email once approved.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>

                {currentStep < 4 ? (
                  <Button
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                    disabled={
                      (currentStep === 1 &&
                        (!formData.businessName || !formData.description || !formData.phone)) ||
                      (currentStep === 2 &&
                        (formData.services.length === 0 || formData.serviceAreas.length === 0)) ||
                      (currentStep === 3 && !formData.experience)
                    }
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isLoading ? 'Submitting...' : 'Submit Application'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
