'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  User,
  Building,
  MapPin,
  FileText,
  Camera,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Upload,
  X,
  Phone,
  Mail,
  Calendar,
  Award,
} from 'lucide-react'
import { toast } from 'sonner'

type FormStep = 1 | 2 | 3 | 4 | 5

interface FormData {
  // Personal Info
  firstName: string
  lastName: string
  phone: string
  dateOfBirth: string
  nationalId: string

  // Business Info
  businessName: string
  description: string
  experience: string
  services: string[]
  serviceAreas: string[]

  // Documents
  documents: {
    nationalId: File | null
    policeClearance: File | null
    businessLicense: File | null
    portfolio: File[]
  }

  // References
  references: Array<{
    name: string
    phone: string
    relationship: string
  }>

  // Additional Info
  languages: string[]
  certifications: string
  agreedToTerms: boolean
}

const serviceCategories = [
  'House Cleaning',
  'Plumbing',
  'Electrical',
  'Gardening',
  'Painting',
  'Carpentry',
  'AC Repair',
  'Appliance Repair',
  'Pest Control',
  'Moving Services',
  'Security Services',
  'Other',
]

const districts = [
  'Colombo',
  'Gampaha',
  'Kalutara',
  'Kandy',
  'Matale',
  'Nuwara Eliya',
  'Galle',
  'Matara',
  'Hambantota',
  'Kurunegala',
  'Puttalam',
  'Anuradhapura',
  'Polonnaruwa',
  'Badulla',
  'Monaragala',
  'Ratnapura',
  'Kegalle',
  'Jaffna',
  'Kilinochchi',
  'Mannar',
  'Vavuniya',
  'Mullaitivu',
  'Batticaloa',
  'Ampara',
  'Trincomalee',
]

const languages = ['Sinhala', 'Tamil', 'English']

export function ProviderApplicationForm({ onClose }: { onClose: () => void }) {
  const router = useRouter()
  const { data: session } = useSession()
  const [currentStep, setCurrentStep] = useState<FormStep>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    nationalId: '',
    businessName: '',
    description: '',
    experience: '',
    services: [],
    serviceAreas: [],
    documents: {
      nationalId: null,
      policeClearance: null,
      businessLicense: null,
      portfolio: [],
    },
    references: [
      { name: '', phone: '', relationship: '' },
      { name: '', phone: '', relationship: '' },
    ],
    languages: [],
    certifications: '',
    agreedToTerms: false,
  })

  const progress = (currentStep / 5) * 100

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  const handleAreaToggle = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceAreas: prev.serviceAreas.includes(area)
        ? prev.serviceAreas.filter((a) => a !== area)
        : [...prev.serviceAreas, area],
    }))
  }

  const handleLanguageToggle = (language: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((l) => l !== language)
        : [...prev.languages, language],
    }))
  }

  const handleFileUpload = (field: string, file: File) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file,
      },
    }))
  }

  const handlePortfolioUpload = (files: FileList) => {
    const fileArray = Array.from(files)
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        portfolio: [...prev.documents.portfolio, ...fileArray],
      },
    }))
  }

  const removePortfolioFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        portfolio: prev.documents.portfolio.filter((_, i) => i !== index),
      },
    }))
  }

  const handleReferenceChange = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      references: prev.references.map((ref, i) => (i === index ? { ...ref, [field]: value } : ref)),
    }))
  }

  const validateStep = (step: FormStep): boolean => {
    switch (step) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.phone &&
          formData.dateOfBirth &&
          formData.nationalId
        )
      case 2:
        return (
          formData.businessName &&
          formData.description &&
          formData.experience &&
          formData.services.length > 0 &&
          formData.serviceAreas.length > 0
        )
      case 3:
        return formData.documents.nationalId && formData.documents.policeClearance
      case 4:
        return formData.references.every((ref) => ref.name && ref.phone && ref.relationship)
      case 5:
        return formData.languages.length > 0 && formData.agreedToTerms
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(5, prev + 1) as FormStep)
    } else {
      toast.error('Please fill in all required fields')
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1) as FormStep)
  }

  const handleSubmit = async () => {
    if (!session?.user?.email) {
      toast.error('Please log in to continue')
      return
    }

    if (!validateStep(5)) {
      toast.error('Please complete all required fields')
      return
    }

    setIsSubmitting(true)

    try {
      // Submit form data
      const response = await fetch('/api/provider/onboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: session.user.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          businessName: formData.businessName,
          description: formData.description,
          services: formData.services,
          serviceAreas: formData.serviceAreas,
          experience: formData.experience,
          certifications: formData.certifications,
          languages: formData.languages,
        }),
      })

      if (response.ok) {
        // Send email notification
        await fetch('/api/provider/notify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: session.user.email,
            name: `${formData.firstName} ${formData.lastName}`,
            businessName: formData.businessName,
          }),
        })

        toast.success('Application submitted successfully!')

        // Redirect to welcome page
        router.push('/provider/welcome')
      } else {
        const error = await response.json()
        toast.error(error.message || 'Failed to submit application')
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      toast.error('Failed to submit application')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-primary flex items-center space-x-2">
              <User className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Personal Information</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+94 77 123 4567"
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="nationalId">National ID Number *</Label>
              <Input
                id="nationalId"
                value={formData.nationalId}
                onChange={(e) => handleInputChange('nationalId', e.target.value)}
                placeholder="123456789V"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-primary flex items-center space-x-2">
              <Building className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Business Information</h3>
            </div>

            <div>
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                placeholder="Your business or professional name"
              />
            </div>

            <div>
              <Label htmlFor="description">Service Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your services and expertise..."
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="experience">Years of Experience *</Label>
              <Select
                value={formData.experience}
                onValueChange={(value) => handleInputChange('experience', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">0-1 years</SelectItem>
                  <SelectItem value="1-3">1-3 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="5-10">5-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Services Offered * (Select all that apply)</Label>
              <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3">
                {serviceCategories.map((service) => (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox
                      id={service}
                      checked={formData.services.includes(service)}
                      onCheckedChange={() => handleServiceToggle(service)}
                    />
                    <Label htmlFor={service} className="text-sm">
                      {service}
                    </Label>
                  </div>
                ))}
              </div>
              {formData.services.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {formData.services.map((service) => (
                    <Badge key={service} variant="secondary">
                      {service}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label>Service Areas * (Select districts you serve)</Label>
              <div className="mt-2 grid max-h-40 grid-cols-2 gap-2 overflow-y-auto md:grid-cols-3">
                {districts.map((district) => (
                  <div key={district} className="flex items-center space-x-2">
                    <Checkbox
                      id={district}
                      checked={formData.serviceAreas.includes(district)}
                      onCheckedChange={() => handleAreaToggle(district)}
                    />
                    <Label htmlFor={district} className="text-sm">
                      {district}
                    </Label>
                  </div>
                ))}
              </div>
              {formData.serviceAreas.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {formData.serviceAreas.map((area) => (
                    <Badge key={area} variant="secondary">
                      {area}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-primary flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Document Upload</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label>National ID Copy *</Label>
                <div className="mt-2 rounded-lg border-2 border-dashed border-gray-300 p-4">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) =>
                      e.target.files?.[0] && handleFileUpload('nationalId', e.target.files[0])
                    }
                    className="hidden"
                    id="nationalId-upload"
                  />
                  <label
                    htmlFor="nationalId-upload"
                    className="flex cursor-pointer flex-col items-center"
                  >
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-600">
                      {formData.documents.nationalId
                        ? formData.documents.nationalId.name
                        : 'Click to upload National ID'}
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <Label>Police Clearance Certificate *</Label>
                <div className="mt-2 rounded-lg border-2 border-dashed border-gray-300 p-4">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) =>
                      e.target.files?.[0] && handleFileUpload('policeClearance', e.target.files[0])
                    }
                    className="hidden"
                    id="police-upload"
                  />
                  <label
                    htmlFor="police-upload"
                    className="flex cursor-pointer flex-col items-center"
                  >
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-600">
                      {formData.documents.policeClearance
                        ? formData.documents.policeClearance.name
                        : 'Click to upload Police Clearance'}
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <Label>Business License (Optional)</Label>
                <div className="mt-2 rounded-lg border-2 border-dashed border-gray-300 p-4">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) =>
                      e.target.files?.[0] && handleFileUpload('businessLicense', e.target.files[0])
                    }
                    className="hidden"
                    id="license-upload"
                  />
                  <label
                    htmlFor="license-upload"
                    className="flex cursor-pointer flex-col items-center"
                  >
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-600">
                      {formData.documents.businessLicense
                        ? formData.documents.businessLicense.name
                        : 'Click to upload Business License'}
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <Label>Portfolio/Work Samples (Optional)</Label>
                <div className="mt-2 rounded-lg border-2 border-dashed border-gray-300 p-4">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => e.target.files && handlePortfolioUpload(e.target.files)}
                    className="hidden"
                    id="portfolio-upload"
                  />
                  <label
                    htmlFor="portfolio-upload"
                    className="flex cursor-pointer flex-col items-center"
                  >
                    <Camera className="h-8 w-8 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-600">Click to upload work samples</span>
                  </label>
                </div>
                {formData.documents.portfolio.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {formData.documents.portfolio.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded bg-gray-50 p-2"
                      >
                        <span className="text-sm">{file.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePortfolioFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-primary flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Professional References</h3>
            </div>

            <p className="text-sm text-gray-600">
              Please provide at least 2 professional references who can vouch for your work quality.
            </p>

            {formData.references.map((reference, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-base">Reference {index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Name *</Label>
                    <Input
                      value={reference.name}
                      onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
                      placeholder="Reference name"
                    />
                  </div>
                  <div>
                    <Label>Phone Number *</Label>
                    <Input
                      value={reference.phone}
                      onChange={(e) => handleReferenceChange(index, 'phone', e.target.value)}
                      placeholder="+94 77 123 4567"
                    />
                  </div>
                  <div>
                    <Label>Relationship *</Label>
                    <Input
                      value={reference.relationship}
                      onChange={(e) => handleReferenceChange(index, 'relationship', e.target.value)}
                      placeholder="Previous client, employer, etc."
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-primary flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Final Details</h3>
            </div>

            <div>
              <Label>Languages Spoken * (Select all that apply)</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {languages.map((language) => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox
                      id={language}
                      checked={formData.languages.includes(language)}
                      onCheckedChange={() => handleLanguageToggle(language)}
                    />
                    <Label htmlFor={language}>{language}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="certifications">Certifications & Qualifications (Optional)</Label>
              <Textarea
                id="certifications"
                value={formData.certifications}
                onChange={(e) => handleInputChange('certifications', e.target.value)}
                placeholder="List any relevant certifications, training, or qualifications..."
                rows={3}
              />
            </div>

            <div className="rounded-lg border bg-gray-50 p-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreedToTerms}
                  onCheckedChange={(checked) => handleInputChange('agreedToTerms', checked)}
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I agree to Weda.lk's Terms of Service and Privacy Policy. I understand that my
                  application will be reviewed and I may be contacted for additional verification. *
                </Label>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white shadow-2xl">
        <div className="border-b p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Provider Application</h2>
              <p className="text-gray-600">Step {currentStep} of 5</p>
            </div>
            <Button variant="ghost" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <Progress value={progress} className="mt-4" />
        </div>

        <div className="p-6">{renderStep()}</div>

        <div className="flex justify-between border-t bg-gray-50 p-6">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {currentStep < 5 ? (
            <Button onClick={nextStep}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !validateStep(5)}
              className="bg-primary text-white"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
