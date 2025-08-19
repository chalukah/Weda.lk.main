import { Separator } from '@/components/ui/separator'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/weda.lk' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/weda_lk' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/weda.lk' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/weda-lk' },
]

export default function Footer() {
  const t = useTranslations('footer')

  const footerLinks = {
    company: [
      { name: t('aboutUs'), href: '/about' },
      { name: t('howItWorks'), href: '/how-it-works' },
      { name: t('becomeProvider'), href: '/become-provider' },
    ],
    services: [
      { name: t('findServices'), href: '/services' },
      { name: t('homeCleaning'), href: '/services?category=cleaning' },
      { name: t('handyman'), href: '/services?category=handyman' },
      { name: t('beautyWellness'), href: '/services?category=beauty' },
    ],
    support: [
      { name: t('helpCenter'), href: '/help' },
      { name: t('contactUs'), href: '/contact' },
      { name: t('faq'), href: '/faq' },
      { name: t('support'), href: '/support' },
    ],
    legal: [
      { name: t('privacyPolicy'), href: '/privacy' },
      { name: t('termsOfService'), href: '/terms' },
      { name: t('cookiePolicy'), href: '/cookies' },
      { name: t('disclaimer'), href: '/disclaimer' },
    ],
  }

  return (
    <footer className="bg-muted/30 text-foreground" suppressHydrationWarning>
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center">
              <Image
                src="/logo.png"
                alt="වැඩ.lk Logo"
                width={32}
                height={32}
                className="mr-2 rounded"
              />
              <span className="text-2xl font-bold">වැඩ.lk</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm">{t('description')}</p>

            {/* Contact Info */}
            <div className="text-muted-foreground space-y-2 text-sm">
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                <span>123 Galle Road, Colombo 03, Sri Lanka</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                <span>+94 11 234 5678</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                <span>info@weda.lk</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('company')}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('services')}</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('support')}</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('legal')}</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-border mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="text-muted-foreground mb-4 text-sm md:mb-0">
            © 2024 වැඩ.lk. {t('rightsReserved')}
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  aria-label={social.name}
                >
                  <Icon className="h-5 w-5" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
