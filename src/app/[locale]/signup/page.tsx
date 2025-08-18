'use client'

import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Eye, EyeOff, User, Users } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export default function SignupPage() {
  const t = useTranslations('auth')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userType, setUserType] = useState<'customer' | 'provider'>('customer')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const formData = new FormData(e.currentTarget)
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    const terms = formData.get('terms') as string

    // Validation
    if (password !== confirmPassword) {
      setError(t('passwordsDoNotMatch'))
      setLoading(false)
      return
    }

    if (!terms) {
      setError(t('pleaseAgreeToTerms'))
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          password,
          userType,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(t('accountCreatedSuccessfully'))
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        setError(data.error || t('registrationError'))
      }
    } catch {
      setError(t('errorOccurred'))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = () => {
    signIn('google', { callbackUrl: '/dashboard' })
  }

  return (
    <div className="bg-background min-h-screen" suppressHydrationWarning>
      <Navbar />

      <main className="pt-16">
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">{t('createAccount')}</CardTitle>
              <p className="text-muted-foreground">{t('joinWeda')}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* User Type Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('iWantTo')}</label>
                <div className="bg-muted grid grid-cols-2 gap-2 rounded-lg p-1">
                  <Button
                    type="button"
                    variant={userType === 'customer' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setUserType('customer')}
                    className="flex items-center space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span>{t('findServices')}</span>
                  </Button>
                  <Button
                    type="button"
                    variant={userType === 'provider' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setUserType('provider')}
                    className="flex items-center space-x-2"
                  >
                    <Users className="h-4 w-4" />
                    <span>{t('provideServices')}</span>
                  </Button>
                </div>
              </div>

              {error && (
                <div className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-md bg-green-50 p-3 text-sm text-green-700">{success}</div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('firstName')}</label>
                    <input
                      name="firstName"
                      type="text"
                      placeholder="John"
                      required
                      className="border-input bg-background ring-offset-background focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('lastName')}</label>
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      required
                      className="border-input bg-background ring-offset-background focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('phoneNumber')}</label>
                  <div className="flex">
                    <div className="bg-muted flex items-center rounded-l-md border border-r-0 px-3">
                      <span className="text-sm">+94</span>
                    </div>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="771234567"
                      required
                      className="border-input bg-background ring-offset-background focus-visible:ring-ring flex-1 rounded-r-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('emailAddress')}</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="border-input bg-background ring-offset-background focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('password')}</label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t('createStrongPassword')}
                      required
                      className="border-input bg-background ring-offset-background focus-visible:ring-ring w-full rounded-md border px-3 py-2 pr-10 text-sm focus-visible:ring-2 focus-visible:outline-none"
                    />
                    <button
                      type="button"
                      className="text-muted-foreground hover:text-foreground absolute top-2.5 right-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('confirmPassword')}</label>
                  <div className="relative">
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder={t('confirmYourPassword')}
                      required
                      className="border-input bg-background ring-offset-background focus-visible:ring-ring w-full rounded-md border px-3 py-2 pr-10 text-sm focus-visible:ring-2 focus-visible:outline-none"
                    />
                    <button
                      type="button"
                      className="text-muted-foreground hover:text-foreground absolute top-2.5 right-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-start space-x-2">
                  <input
                    name="terms"
                    type="checkbox"
                    id="terms"
                    className="mt-1 h-4 w-4"
                    required
                  />
                  <label htmlFor="terms" className="text-muted-foreground text-sm">
                    {t('agreeToTerms')}{' '}
                    <Link href="/terms" className="text-primary hover:underline">
                      {t('termsOfService')}
                    </Link>{' '}
                    {t('and')}{' '}
                    <Link href="/privacy" className="text-primary hover:underline">
                      {t('privacyPolicy')}
                    </Link>
                  </label>
                </div>

                {/* Marketing Consent */}
                <div className="flex items-start space-x-2">
                  <input name="marketing" type="checkbox" id="marketing" className="mt-1 h-4 w-4" />
                  <label htmlFor="marketing" className="text-muted-foreground text-sm">
                    {t('marketingConsent')}
                  </label>
                </div>

                {/* Sign Up Button */}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? t('creatingAccount') : t('createAccount')}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background text-muted-foreground px-2">
                    {t('orContinueWith')}
                  </span>
                </div>
              </div>

              {/* Social Signup */}
              <div className="grid grid-cols-1 gap-4">
                <Button variant="outline" className="w-full" onClick={handleGoogleSignUp}>
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  {t('continueWithGoogle')}
                </Button>
              </div>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">{t('alreadyHaveAccount')} </span>
                <Link href="/login" className="text-primary hover:underline">
                  {t('signIn')}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
