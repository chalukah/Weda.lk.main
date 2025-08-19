'use client'

import { Badge } from '@/components/ui/badge'
import { Shield, CreditCard, Award, CheckCircle, AlertCircle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

export type VerificationStatus =
  | 'police_verified'
  | 'identity_verified'
  | 'professional_certified'
  | 'platform_verified'
export type BadgeState = 'active' | 'expired' | 'pending'

interface TrustBadgeProps {
  type: VerificationStatus
  state?: BadgeState
  className?: string
  showTooltip?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const getBadgeConfig = (t: (key: string) => string) => ({
  police_verified: {
    icon: Shield,
    label: t('policeVerified'),
    description: t('policeVerifiedDesc'),
    color: {
      active: 'bg-green-500 text-white border-green-600',
      expired: 'bg-red-100 text-red-800 border-red-300',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    },
  },
  identity_verified: {
    icon: CreditCard,
    label: t('identityVerified'),
    description: t('identityVerifiedDesc'),
    color: {
      active: 'bg-blue-500 text-white border-blue-600',
      expired: 'bg-red-100 text-red-800 border-red-300',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    },
  },
  professional_certified: {
    icon: Award,
    label: t('professionalCertified'),
    description: t('professionalCertifiedDesc'),
    color: {
      active: 'bg-amber-500 text-white border-amber-600',
      expired: 'bg-red-100 text-red-800 border-red-300',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    },
  },
  platform_verified: {
    icon: CheckCircle,
    label: t('platformVerified'),
    description: t('platformVerifiedDesc'),
    color: {
      active: 'bg-slate-500 text-white border-slate-600',
      expired: 'bg-red-100 text-red-800 border-red-300',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    },
  },
})

const sizeConfig = {
  sm: {
    badge: 'text-xs px-2 py-1',
    icon: 'h-3 w-3',
    gap: 'gap-1',
  },
  md: {
    badge: 'text-sm px-3 py-1.5',
    icon: 'h-4 w-4',
    gap: 'gap-1.5',
  },
  lg: {
    badge: 'text-base px-4 py-2',
    icon: 'h-5 w-5',
    gap: 'gap-2',
  },
}

export function TrustBadge({
  type,
  state = 'active',
  className,
  showTooltip = true,
  size = 'md',
}: TrustBadgeProps) {
  const t = useTranslations('trustBadges')
  const badgeConfig = getBadgeConfig(t)
  const config = badgeConfig[type]
  const sizeStyles = sizeConfig[size]
  const Icon = config.icon

  // Choose appropriate status icon
  const StatusIcon = state === 'expired' ? AlertCircle : state === 'pending' ? Clock : null

  const badgeContent = (
    <Badge
      variant="secondary"
      className={cn(
        'inline-flex items-center border font-medium transition-all duration-300',
        'animate-in fade-in-0 zoom-in-95',
        config.color[state],
        sizeStyles.badge,
        sizeStyles.gap,
        className
      )}
    >
      <Icon className={cn('flex-shrink-0', sizeStyles.icon)} />
      <span className="truncate">{config.label}</span>
      {StatusIcon && <StatusIcon className={cn('ml-1 flex-shrink-0', sizeStyles.icon)} />}
    </Badge>
  )

  if (showTooltip) {
    return (
      <div className="group relative inline-flex">
        {badgeContent}
        <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 transform rounded-lg bg-slate-900 px-3 py-2 text-sm whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {config.description}
          {state === 'expired' && ` ${t('expired')}`}
          {state === 'pending' && ` ${t('pendingReview')}`}
          <div className="absolute top-full left-1/2 -translate-x-1/2 transform border-4 border-transparent border-t-slate-900"></div>
        </div>
      </div>
    )
  }

  return badgeContent
}

// Convenience components for common use cases
export function PoliceBadge({ state, size, className }: Omit<TrustBadgeProps, 'type'>) {
  const props: TrustBadgeProps = {
    type: 'police_verified',
    ...(size !== undefined && { size }),
    ...(className !== undefined && { className }),
  }
  if (state !== undefined) props.state = state
  return <TrustBadge {...props} />
}

export function IdentityBadge({ state, size, className }: Omit<TrustBadgeProps, 'type'>) {
  const props: TrustBadgeProps = {
    type: 'identity_verified',
    ...(size !== undefined && { size }),
    ...(className !== undefined && { className }),
  }
  if (state !== undefined) props.state = state
  return <TrustBadge {...props} />
}

export function ProfessionalBadge({ state, size, className }: Omit<TrustBadgeProps, 'type'>) {
  const props: TrustBadgeProps = {
    type: 'professional_certified',
    ...(size !== undefined && { size }),
    ...(className !== undefined && { className }),
  }
  if (state !== undefined) props.state = state
  return <TrustBadge {...props} />
}

export function PlatformBadge({ state, size, className }: Omit<TrustBadgeProps, 'type'>) {
  const props: TrustBadgeProps = {
    type: 'platform_verified',
    ...(size !== undefined && { size }),
    ...(className !== undefined && { className }),
  }
  if (state !== undefined) props.state = state
  return <TrustBadge {...props} />
}
