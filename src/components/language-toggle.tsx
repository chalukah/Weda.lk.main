'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Languages, Check } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'
import { routing } from '@/i18n/routing'
import { useState, useEffect } from 'react'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'si', name: 'සිංහල', flag: '🇱🇰' },
]

export function LanguageToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('common')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="h-9 w-9 px-0" disabled>
        <Languages className="h-4 w-4" />
        <span className="sr-only">Language</span>
      </Button>
    )
  }

  const switchLanguage = (newLocale: string) => {
    // Get the pathname without the current locale
    const pathnameWithoutLocale = pathname.startsWith(`/${locale}`)
      ? pathname.slice(`/${locale}`.length) || '/'
      : pathname

    // Construct new path with new locale
    const newPath = `/${newLocale}${pathnameWithoutLocale === '/' ? '' : pathnameWithoutLocale}`
    router.push(newPath)
    router.refresh()
  }

  const currentLanguage = languages.find((lang) => lang.code === locale)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 w-9 px-0">
          <Languages className="h-4 w-4" />
          <span className="sr-only">{t('language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => switchLanguage(language.code)}
            className="flex cursor-pointer items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">{language.flag}</span>
              <span>{language.name}</span>
            </div>
            {locale === language.code && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
