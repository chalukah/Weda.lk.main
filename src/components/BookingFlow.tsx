'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { LocationPicker, Location } from './LocationPicker'
import { ProviderCard, Provider } from './ProviderCard'
import { TrustBadge } from './TrustBadge'
import { useTranslations } from 'next-intl'
import {
  Calendar,
  Clock,
  Camera,
  CreditCard,
  Shield,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  DollarSign,
  FileText,
  Phone,
  MessageCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface BookingFlowProps {
  provider: Provider
  onComplete?: (booking: BookingData) => void
  onCancel?: () => void
  className?: string
}

export interface BookingData {
  providerId: string
  serviceType: string
  serviceDetails: string
  scheduledDateTime: Date
  location: Location
  photos?: string[]
  customerNotes?: string
  estimatedCost: number
  platformFee: number
  totalCost: number
  paymentMethod: string
}

type BookingStep = 'service' | 'schedule' | 'details' | 'payment' | 'confirmation'

const serviceTypes = [
  { id: 'plumbing_repair', price: 2500 },
  { id: 'plumbing_installation', price: 4000 },
  { id: 'plumbing_maintenance', price: 1500 },
  { id: 'plumbing_emergency', price: 6000 },
  { id: 'custom', price: 0 },
]

const timeSlots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
]

export function BookingFlow({ provider, onComplete, onCancel, className }: BookingFlowProps) {
  const t = useTranslations('booking')
  const [currentStep, setCurrentStep] = useState<BookingStep>('service')
  const [bookingData, setBookingData] = useState<Partial<BookingData>>({
    providerId: provider.id,
    platformFee: 575, // 23% of 2500 base service
  })

  const steps = [
    { id: 'service', title: t('stepTitles.service'), description: t('stepDescriptions.service') },
    {
      id: 'schedule',
      title: t('stepTitles.schedule'),
      description: t('stepDescriptions.schedule'),
    },
    { id: 'details', title: t('stepTitles.details'), description: t('stepDescriptions.details') },
    { id: 'payment', title: t('stepTitles.payment'), description: t('stepDescriptions.payment') },
    {
      id: 'confirmation',
      title: t('stepTitles.complete'),
      description: t('stepDescriptions.complete'),
    },
  ]

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)
  const canProceed = validateCurrentStep()

  function validateCurrentStep(): boolean {
    switch (currentStep) {
      case 'service':
        return !!bookingData.serviceType
      case 'schedule':
        return !!bookingData.scheduledDateTime
      case 'details':
        return !!bookingData.location?.address && !!bookingData.serviceDetails
      case 'payment':
        return !!bookingData.paymentMethod
      default:
        return true
    }
  }

  const calculateCosts = () => {
    const selectedService = serviceTypes.find((s) => s.id === bookingData.serviceType)
    const serviceCost = selectedService?.price || 0
    const platformFee = Math.round(serviceCost * 0.23)
    const totalCost = serviceCost + platformFee

    setBookingData((prev) => ({
      ...prev,
      estimatedCost: serviceCost,
      platformFee,
      totalCost,
    }))
  }

  const handleNext = () => {
    if (!canProceed) return

    if (currentStep === 'service') {
      calculateCosts()
    }

    const nextIndex = currentStepIndex + 1
    if (nextIndex < steps.length && steps[nextIndex]) {
      setCurrentStep(steps[nextIndex].id as BookingStep)
    }
  }

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0 && steps[prevIndex]) {
      setCurrentStep(steps[prevIndex].id as BookingStep)
    } else {
      onCancel?.()
    }
  }

  const handleComplete = () => {
    if (bookingData.scheduledDateTime && bookingData.location && bookingData.serviceType) {
      onComplete?.(bookingData as BookingData)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 'service':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-foreground mb-4 font-medium">{t('selectServiceType')}</h3>
              <div className="grid gap-3">
                {serviceTypes.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setBookingData({ ...bookingData, serviceType: service.id })}
                    className={cn(
                      'flex items-center justify-between rounded-lg border p-4 transition-all',
                      'hover:border-primary hover:bg-primary/5',
                      bookingData.serviceType === service.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border'
                    )}
                  >
                    <span className="font-medium">{t(`serviceTypes.${service.id}`)}</span>
                    {service.price > 0 && (
                      <span className="text-muted-foreground">
                        LKR {service.price.toLocaleString()}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      case 'schedule':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-foreground mb-4 font-medium">{t('chooseDateAndTime')}</h3>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="text-foreground mb-2 block text-sm font-medium">
                  {t('date')}
                </label>
                <Input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => {
                    const date = new Date(e.target.value)
                    setBookingData({
                      ...bookingData,
                      scheduledDateTime: date,
                    })
                  }}
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="text-foreground mb-2 block text-sm font-medium">
                  {t('availableTimes')}
                </label>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={
                        bookingData.scheduledDateTime?.getHours() === parseInt(time)
                          ? 'default'
                          : 'outline'
                      }
                      size="sm"
                      onClick={() => {
                        const date = bookingData.scheduledDateTime || new Date()
                        const [hours, period] = time.split(' ')
                        if (hours) {
                          const hourParts = hours.split(':').map(Number)
                          const hour = hourParts[0]
                          if (hour !== undefined) {
                            const adjustedHour = period === 'PM' && hour !== 12 ? hour + 12 : hour
                            date.setHours(adjustedHour, 0, 0, 0)
                            setBookingData({ ...bookingData, scheduledDateTime: date })
                          }
                        }
                      }}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 'details':
        return (
          <div className="space-y-6">
            {/* Location */}
            <div>
              <h4 className="text-foreground mb-3 font-medium">{t('serviceLocation')}</h4>
              <LocationPicker
                value={bookingData.location}
                onChange={(location) => setBookingData({ ...bookingData, location })}
                variant="detect"
                placeholder={t('enterServiceAddress')}
              />
            </div>

            {/* Service Details */}
            <div>
              <h4 className="text-foreground mb-3 font-medium">{t('serviceRequirements')}</h4>
              <textarea
                value={bookingData.serviceDetails || ''}
                onChange={(e) => setBookingData({ ...bookingData, serviceDetails: e.target.value })}
                placeholder={t('describeWork')}
                className="border-border h-24 w-full resize-none rounded-lg border p-3 text-sm"
              />
            </div>

            {/* Photo Upload */}
            <div>
              <h4 className="text-foreground mb-3 font-medium">{t('photosOptional')}</h4>
              <div className="border-border rounded-lg border-2 border-dashed p-8 text-center">
                <Camera className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                <p className="text-muted-foreground mb-2 text-sm">{t('uploadPhotosHelp')}</p>
                <Button variant="outline" size="sm">
                  {t('chooseFiles')}
                </Button>
              </div>
            </div>
          </div>
        )

      case 'payment':
        return (
          <div className="space-y-6">
            {/* Cost Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t('costBreakdown')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('serviceCost')}</span>
                  <span>LKR {bookingData.estimatedCost?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('platformFee')}</span>
                  <span>LKR {bookingData.platformFee?.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>{t('total')}</span>
                  <span>LKR {bookingData.totalCost?.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <div>
              <h4 className="text-foreground mb-3 font-medium">{t('paymentMethod')}</h4>
              <div className="space-y-2">
                {[
                  { id: 'card', icon: CreditCard },
                  { id: 'bank', icon: Shield },
                  { id: 'cash', icon: DollarSign },
                ].map((method) => {
                  const Icon = method.icon
                  return (
                    <button
                      key={method.id}
                      onClick={() => setBookingData({ ...bookingData, paymentMethod: method.id })}
                      className={cn(
                        'flex w-full items-center space-x-3 rounded-lg border p-4 transition-all',
                        'hover:border-primary hover:bg-primary/5',
                        bookingData.paymentMethod === method.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border'
                      )}
                    >
                      <Icon className="text-muted-foreground h-5 w-5" />
                      <span className="font-medium">{t(`paymentMethods.${method.id}`)}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Secure Payment Notice */}
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="mt-0.5 h-5 w-5 text-green-600" />
                <div className="text-sm">
                  <p className="text-foreground font-medium">{t('secureEscrowPayment')}</p>
                  <p className="text-muted-foreground mt-1">{t('escrowPaymentDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        )

      case 'confirmation':
        return (
          <div className="space-y-6 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>

            <div>
              <h3 className="text-foreground mb-2 text-xl font-semibold">
                {t('bookingConfirmed')}
              </h3>
              <p className="text-muted-foreground">
                {t('requestSent', { provider: provider.name })}
              </p>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4 text-left">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('bookingId')}</span>
                    <span className="font-medium">
                      WD-{Math.random().toString(36).substring(7).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('service')}</span>
                    <span className="font-medium">
                      {t(`serviceTypes.${bookingData.serviceType}`)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('dateAndTime')}</span>
                    <span className="font-medium">
                      {bookingData.scheduledDateTime?.toLocaleDateString()} at{' '}
                      {bookingData.scheduledDateTime?.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('total')}</span>
                    <span className="font-medium">
                      LKR {bookingData.totalCost?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="outline" className="flex-1">
                <Phone className="mr-2 h-4 w-4" />
                {t('callProvider')}
              </Button>
              <Button variant="outline" className="flex-1">
                <MessageCircle className="mr-2 h-4 w-4" />
                {t('sendMessage')}
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={cn('mx-auto max-w-2xl', className)}>
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all',
                  index <= currentStepIndex
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-muted-foreground'
                )}
              >
                {index < currentStepIndex ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'mx-2 h-0.5 flex-1',
                    index < currentStepIndex ? 'bg-primary' : 'bg-border'
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-foreground text-lg font-semibold">
            {steps[currentStepIndex]?.title}
          </h2>
          <p className="text-muted-foreground text-sm">{steps[currentStepIndex]?.description}</p>
        </div>
      </div>

      {/* Provider Card */}
      {currentStep !== 'confirmation' && (
        <div className="mb-6">
          <ProviderCard provider={provider} variant="minimal" showPricing={false} />
        </div>
      )}

      {/* Step Content */}
      <Card className="mb-6">
        <CardContent className="p-6">{renderStepContent()}</CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 'confirmation'}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {currentStepIndex === 0 ? t('cancel') : t('back')}
        </Button>

        {currentStep === 'confirmation' ? (
          <Button onClick={() => (window.location.href = '/dashboard')}>
            {t('goToDashboard')}
          </Button>
        ) : currentStep === 'payment' ? (
          <Button onClick={handleComplete} disabled={!canProceed}>
            {t('confirmBooking')}
            <CheckCircle className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleNext} disabled={!canProceed}>
            {t('next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
