import { Separator } from '@/components/ui/separator'
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

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
    <footer className="bg-gray-900 text-white" suppressHydrationWarning>
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center">
              <Home className="mr-2 h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold">වැඩ.lk</span>
            </div>
            <p className="mb-6 max-w-sm text-gray-400">{t('description')}</p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-400">
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
                    className="text-gray-400 transition-colors duration-200 hover:text-white"
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
                    className="text-gray-400 transition-colors duration-200 hover:text-white"
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
                    className="text-gray-400 transition-colors duration-200 hover:text-white"
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
                    className="text-gray-400 transition-colors duration-200 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mb-8 bg-gray-700" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 text-sm text-gray-400 md:mb-0">
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
                  className="text-gray-400 transition-colors duration-200 hover:text-white"
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
