'use client'

import { useState } from 'react'
import { useRouter } from '@/i18n/routing'
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
import confetti from 'canvas-confetti'
import { districts as allDistricts } from '@/lib/locations'
import { useTranslations } from 'next-intl'

type FormStep = 1 | 2 | 3 | 4

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

  // Additional Info
  languages: string[]
  certifications: string
  agreedToTerms: boolean
}

const getServiceCategories = (t: any) => [
  t('serviceCategories.houseCleaning'),
  t('serviceCategories.plumbing'),
  t('serviceCategories.electrical'),
  t('serviceCategories.gardening'),
  t('serviceCategories.painting'),
  t('serviceCategories.carpentry'),
  t('serviceCategories.acRepair'),
  t('serviceCategories.applianceRepair'),
  t('serviceCategories.pestControl'),
  'Moving Services',
  t('serviceCategories.security'),
  'Other',
]

// Use comprehensive districts list from shared locations
const districts = allDistricts

const getLanguages = (t: any) => [
  t('providerApplication.languages.sinhala'),
  t('providerApplication.languages.tamil'),
  t('providerApplication.languages.english'),
]

export function ProviderApplicationForm({ onClose }: { onClose: () => void }) {
  const router = useRouter()
  const { data: session } = useSession()
  const t = useTranslations()
  const [currentStep, setCurrentStep] = useState<FormStep>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const serviceCategories = getServiceCategories(t)
  const languages = getLanguages(t)
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
    languages: [],
    certifications: '',
    agreedToTerms: false,
  })

  const progress = (currentStep / 4) * 100

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

  const validateStep = (step: FormStep): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.firstName &&
          formData.lastName &&
          formData.phone &&
          formData.dateOfBirth &&
          formData.nationalId
        )
      case 2:
        return !!(
          formData.businessName &&
          formData.description &&
          formData.experience &&
          formData.services.length > 0 &&
          formData.serviceAreas.length > 0
        )
      case 3:
        const requiresPoliceClearance = formData.services.includes('House Cleaning')
        return !!(
          formData.documents.nationalId &&
          (!requiresPoliceClearance || formData.documents.policeClearance)
        )
      case 4:
        return !!(formData.languages.length > 0 && formData.agreedToTerms)
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(4, prev + 1) as FormStep)
    } else {
      toast.error('Please fill in all required fields')
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1) as FormStep)
  }

  const uploadDocument = async (file: File, documentType: string) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('documentType', documentType)

    const response = await fetch('/api/provider/upload-document', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Upload failed')
    }

    const result = await response.json()
    return result.data
  }

  const handleSubmit = async () => {
    if (!session?.user?.email) {
      toast.error('Please log in to continue')
      return
    }

    if (!validateStep(4)) {
      toast.error('Please complete all required fields')
      return
    }

    setIsSubmitting(true)

    try {
      // Upload documents first
      const uploadedDocuments = []

      if (formData.documents.nationalId) {
        toast.info('Uploading National ID document...')
        const nationalIdDoc = await uploadDocument(formData.documents.nationalId, 'NATIONAL_ID')
        uploadedDocuments.push({
          documentType: 'NATIONAL_ID',
          fileUrl: nationalIdDoc.fileUrl,
          expiryDate: null, // National ID doesn't typically expire
        })
      }

      if (formData.documents.policeClearance) {
        toast.info('Uploading Police Clearance document...')
        const policeDoc = await uploadDocument(
          formData.documents.policeClearance,
          'POLICE_CLEARANCE'
        )
        uploadedDocuments.push({
          documentType: 'POLICE_CLEARANCE',
          fileUrl: policeDoc.fileUrl,
          expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // Expires in 1 year
        })
      }

      if (formData.documents.businessLicense) {
        toast.info('Uploading Business License document...')
        const businessDoc = await uploadDocument(
          formData.documents.businessLicense,
          'BUSINESS_REGISTRATION'
        )
        uploadedDocuments.push({
          documentType: 'BUSINESS_REGISTRATION',
          fileUrl: businessDoc.fileUrl,
          expiryDate: null,
        })
      }

      toast.info('Submitting provider application...')

      // Submit form data with uploaded document URLs
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
          documents: uploadedDocuments, // Include uploaded documents
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

        // Trigger celebration animation
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })

        // Multiple confetti bursts
        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
          })
        }, 250)

        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
          })
        }, 400)

        toast.success('🎉 Application submitted successfully! Welcome to Weda.lk!')

        // Redirect to welcome page after a brief delay to show animation
        setTimeout(() => {
          router.push('/provider/welcome')
        }, 2000)
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
              <h3 className="text-lg font-semibold">
                {t('providerApplication.personalInformation')}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="firstName">{t('providerApplication.firstName')}</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder={t('providerApplication.enterFirstName')}
                />
              </div>
              <div>
                <Label htmlFor="lastName">{t('providerApplication.lastName')}</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder={t('providerApplication.enterLastName')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="phone">{t('providerApplication.phoneNumber')}</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+94 77 123 4567"
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">{t('providerApplication.dateOfBirth')}</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="nationalId">{t('providerApplication.nationalId')}</Label>
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
              <h3 className="text-lg font-semibold">
                {t('providerApplication.businessInformation')}
              </h3>
            </div>

            <div>
              <Label htmlFor="businessName">{t('providerApplication.businessName')}</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                placeholder={t('providerApplication.businessNamePlaceholder')}
              />
            </div>

            <div>
              <Label htmlFor="description">{t('providerApplication.serviceDescription')}</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder={t('providerApplication.serviceDescriptionPlaceholder')}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="experience">{t('providerApplication.yearsExperience')}</Label>
              <Select
                value={formData.experience}
                onValueChange={(value) => handleInputChange('experience', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('providerApplication.selectExperience')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">
                    {t('providerApplication.experienceOptions.0-1')}
                  </SelectItem>
                  <SelectItem value="1-3">
                    {t('providerApplication.experienceOptions.1-3')}
                  </SelectItem>
                  <SelectItem value="3-5">
                    {t('providerApplication.experienceOptions.3-5')}
                  </SelectItem>
                  <SelectItem value="5-10">
                    {t('providerApplication.experienceOptions.5-10')}
                  </SelectItem>
                  <SelectItem value="10+">
                    {t('providerApplication.experienceOptions.10+')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>{t('providerApplication.servicesOffered')}</Label>
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
              <Label>{t('providerApplication.serviceAreas')}</Label>
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
              <h3 className="text-lg font-semibold">{t('providerApplication.documentUpload')}</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label>{t('providerApplication.nationalIdCopy')}</Label>
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
                        : t('providerApplication.uploadNationalId')}
                    </span>
                  </label>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {t('providerApplication.uploadNationalIdDesc')}
                </p>
              </div>

              {formData.services.includes('House Cleaning') && (
                <div>
                  <Label>{t('providerApplication.policeClearance')}</Label>
                  <div className="mt-2 rounded-lg border-2 border-dashed border-gray-300 p-4">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) =>
                        e.target.files?.[0] &&
                        handleFileUpload('policeClearance', e.target.files[0])
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
                          : t('providerApplication.uploadPoliceClearance')}
                      </span>
                    </label>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {t('providerApplication.policeClearanceDesc')}
                  </p>
                </div>
              )}

              <div>
                <Label>{t('providerApplication.portfolio')}</Label>
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
                    <span className="mt-2 text-sm text-gray-600">
                      {t('providerApplication.uploadPortfolio')}
                    </span>
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
              <CheckCircle className="h-5 w-5" />
              <h3 className="text-lg font-semibold">{t('providerApplication.finalDetails')}</h3>
            </div>

            <div>
              <Label>{t('providerApplication.languagesSpoken')}</Label>
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
              <Label htmlFor="certifications">{t('providerApplication.certifications')}</Label>
              <Textarea
                id="certifications"
                value={formData.certifications}
                onChange={(e) => handleInputChange('certifications', e.target.value)}
                placeholder={t('providerApplication.certificationsPlaceholder')}
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
                  {t('providerApplication.termsAgreement')}
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
              <h2 className="text-2xl font-bold">{t('providerApplication.title')}</h2>
              <p className="text-gray-600">
                {t('providerApplication.stepOf', { current: currentStep, total: 4 })}
              </p>
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
            {t('providerApplication.previous')}
          </Button>

          {currentStep < 4 ? (
            <Button onClick={nextStep}>
              {t('providerApplication.next')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !validateStep(4)}
              className="bg-primary text-white"
            >
              {isSubmitting
                ? t('providerApplication.submitting')
                : t('providerApplication.submitApplication')}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
