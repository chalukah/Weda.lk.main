'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from '@/i18n/routing'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { User, Briefcase, ArrowRight, Check } from 'lucide-react'

interface RoleSelectionProps {
  onRoleSelected?: (role: 'CUSTOMER' | 'PROVIDER' | 'BOTH') => void
}

export function RoleSelection({ onRoleSelected }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<'CUSTOMER' | 'PROVIDER' | 'BOTH' | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, update } = useSession()
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
      title: 'Service Seeker',
      description: 'Find and book trusted service providers for your home',
      icon: User,
      features: [
        'Browse verified service providers',
        'Book services with secure payments',
        'Track service progress',
        'Leave reviews and ratings',
      ],
      badge: 'Popular Choice',
    },
    {
      id: 'PROVIDER' as const,
      title: 'Service Provider',
      description: 'Offer your services and grow your business with Weda.lk',
      icon: Briefcase,
      features: [
        'Create your professional profile',
        'Get verified and build trust',
        'Receive service requests',
        'Earn with secure payments',
      ],
      badge: 'Earn Money',
    },
    {
      id: 'BOTH' as const,
      title: 'Both Roles',
      description: 'Use services and offer your own skills on the platform',
      icon: ArrowRight,
      features: [
        'Full customer access',
        'Full provider access',
        'Switch between roles easily',
        'Maximum platform benefits',
      ],
      badge: 'Best Value',
    },
  ]

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="w-full max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Welcome to Weda.lk! 🎉</h1>
          <p className="text-lg text-gray-600">
            How would you like to use our platform? You can always change this later.
          </p>
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
            {isLoading ? 'Setting up...' : 'Continue'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          {selectedRole && (
            <p className="mt-4 text-sm text-gray-600">
              {selectedRole === 'BOTH'
                ? "You'll be able to use all features of the platform"
                : selectedRole === 'PROVIDER'
                  ? "You'll be guided through the provider verification process"
                  : 'You can start browsing and booking services immediately'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
