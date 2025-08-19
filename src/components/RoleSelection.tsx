'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from '@/i18n/routing'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { User, Briefcase, ArrowRight, Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface RoleSelectionProps {
  onRoleSelected?: (role: 'CUSTOMER' | 'PROVIDER' | 'BOTH') => void
}

export function RoleSelection({ onRoleSelected }: RoleSelectionProps) {
  const t = useTranslations('roleSelection')
  const [selectedRole, setSelectedRole] = useState<'CUSTOMER' | 'PROVIDER' | 'BOTH' | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const sessionResult = useSession()

  // Safe destructuring with fallbacks
  const session = sessionResult?.data || null
  const update = sessionResult?.update

  const router = useRouter()

  const handleRoleSelection = async () => {
    if (!selectedRole || !session?.user?.email) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/user/update-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.user.email,
          role: selectedRole,
        }),
      })

      if (response.ok) {
        // Update the session to reflect the new role
        await update({
          ...session,
          user: {
            ...session.user,
            role: selectedRole,
            needsRoleSelection: false,
          },
        })

        onRoleSelected?.(selectedRole)

        // Redirect based on role selection
        if (selectedRole === 'PROVIDER' || selectedRole === 'BOTH') {
          router.push('/onboarding/provider')
        } else {
          router.push('/dashboard')
        }
      } else {
        console.error('Failed to update role')
      }
    } catch (error) {
      console.error('Error updating role:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const roleOptions = [
    {
      id: 'CUSTOMER' as const,
      title: t('serviceSeeker'),
      description: t('serviceSeekerDesc'),
      icon: User,
      features: [
        t('features.browseProviders'),
        t('features.bookServices'),
        t('features.trackProgress'),
        t('features.leaveReviews'),
      ],
      badge: t('popularChoice'),
    },
    {
      id: 'PROVIDER' as const,
      title: t('serviceProvider'),
      description: t('serviceProviderDesc'),
      icon: Briefcase,
      features: [
        t('features.createProfile'),
        t('features.getVerified'),
        t('features.receiveRequests'),
        t('features.earnMoney'),
      ],
      badge: t('earnMoney'),
    },
    {
      id: 'BOTH' as const,
      title: t('bothRoles'),
      description: t('bothRolesDesc'),
      icon: ArrowRight,
      features: [
        t('features.fullCustomer'),
        t('features.fullProvider'),
        t('features.switchRoles'),
        t('features.maxBenefits'),
      ],
      badge: t('bestValue'),
    },
  ]

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="w-full max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">{t('welcomeTitle')}</h1>
          <p className="text-lg text-gray-600">{t('welcomeDesc')}</p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {roleOptions.map((option) => {
            const Icon = option.icon
            const isSelected = selectedRole === option.id

            return (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  isSelected ? 'bg-green-50 shadow-lg ring-2 ring-green-500' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedRole(option.id)}
              >
                <CardHeader className="pb-4 text-center">
                  <div className="mb-3 flex items-center justify-center">
                    <div
                      className={`rounded-full p-3 ${
                        isSelected ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="mb-2 flex justify-center">
                    <Badge variant={isSelected ? 'default' : 'secondary'}>{option.badge}</Badge>
                  </div>
                  <CardTitle className="text-xl">{option.title}</CardTitle>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {option.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <Check
                          className={`mt-0.5 mr-2 h-4 w-4 ${
                            isSelected ? 'text-green-500' : 'text-gray-400'
                          }`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Button
            onClick={handleRoleSelection}
            disabled={!selectedRole || isLoading}
            size="lg"
            className="px-8"
          >
            {isLoading ? t('settingUp') : t('continue')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          {selectedRole && (
            <p className="mt-4 text-sm text-gray-600">
              {selectedRole === 'BOTH'
                ? t('roleDescriptions.both')
                : selectedRole === 'PROVIDER'
                  ? t('roleDescriptions.provider')
                  : t('roleDescriptions.customer')}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
