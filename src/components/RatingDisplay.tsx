'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingDisplayProps {
  rating: number
  maxRating?: number
  reviewCount?: number
  variant?: 'full' | 'compact' | 'detailed'
  size?: 'sm' | 'md' | 'lg'
  showVerifiedIndicator?: boolean
  className?: string
}

const sizeConfig = {
  sm: {
    star: 'h-3 w-3',
    text: 'text-xs',
    gap: 'gap-1',
  },
  md: {
    star: 'h-4 w-4',
    text: 'text-sm',
    gap: 'gap-1.5',
  },
  lg: {
    star: 'h-5 w-5',
    text: 'text-base',
    gap: 'gap-2',
  },
}

export function RatingDisplay({
  rating,
  maxRating = 5,
  reviewCount,
  variant = 'full',
  size = 'md',
  showVerifiedIndicator = false,
  className,
}: RatingDisplayProps) {
  const sizeStyles = sizeConfig[size]
  const hasReviews = reviewCount !== undefined && reviewCount > 0

  // Generate stars
  const stars = []
  for (let i = 1; i <= maxRating; i++) {
    const isFilled = i <= Math.floor(rating)
    const isPartial = i === Math.ceil(rating) && rating % 1 !== 0

    stars.push(
      <div key={i} className="relative">
        <Star
          className={cn(
            sizeStyles.star,
            'transition-colors duration-200',
            isFilled ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'
          )}
        />
        {isPartial && (
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${(rating % 1) * 100}%` }}
          >
            <Star className={cn(sizeStyles.star, 'fill-amber-400 text-amber-400')} />
          </div>
        )}
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={cn('inline-flex items-center', sizeStyles.gap, className)}>
        <div className="flex items-center">{stars}</div>
        {hasReviews && (
          <span className={cn(sizeStyles.text, 'text-muted-foreground')}>({reviewCount})</span>
        )}
      </div>
    )
  }

  if (variant === 'detailed') {
    return (
      <div className={cn('space-y-2', className)}>
        {/* Stars and rating */}
        <div className={cn('flex items-center', sizeStyles.gap)}>
          <div className="flex items-center">{stars}</div>
          <span className={cn(sizeStyles.text, 'text-foreground font-medium')}>
            {rating.toFixed(1)}
          </span>
          <span className={cn(sizeStyles.text, 'text-muted-foreground')}>/ {maxRating}</span>
          {showVerifiedIndicator && hasReviews && (
            <span className={cn(sizeStyles.text, 'font-medium text-green-600 dark:text-green-400')}>
              ✓ Verified Reviews
            </span>
          )}
        </div>

        {/* Review count and breakdown */}
        {hasReviews && (
          <div className={cn(sizeStyles.text, 'text-muted-foreground')}>
            Based on {reviewCount} review{reviewCount !== 1 ? 's' : ''}
            {!hasReviews && (
              <span className="text-muted-foreground ml-1 italic">(No reviews yet)</span>
            )}
          </div>
        )}
      </div>
    )
  }

  // Full variant (default)
  return (
    <div className={cn('inline-flex items-center', sizeStyles.gap, className)}>
      <div className="flex items-center">{stars}</div>
      <span className={cn(sizeStyles.text, 'text-foreground font-medium')}>
        {rating.toFixed(1)}
      </span>
      {hasReviews && (
        <span className={cn(sizeStyles.text, 'text-muted-foreground')}>
          ({reviewCount} review{reviewCount !== 1 ? 's' : ''})
        </span>
      )}
      {!hasReviews && (
        <span className={cn(sizeStyles.text, 'text-muted-foreground italic')}>No reviews yet</span>
      )}
      {showVerifiedIndicator && hasReviews && (
        <span
          className={cn(sizeStyles.text, 'ml-1 font-medium text-green-600 dark:text-green-400')}
        >
          ✓
        </span>
      )}
    </div>
  )
}

// Rating breakdown component for detailed views
interface RatingBreakdownProps {
  ratings: { stars: number; count: number }[]
  totalReviews: number
  className?: string
}

export function RatingBreakdown({ ratings, totalReviews, className }: RatingBreakdownProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {ratings.map(({ stars, count }) => {
        const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0

        return (
          <div key={stars} className="flex items-center gap-2 text-sm">
            <span className="w-8 text-right">{stars}</span>
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <div className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-2 rounded-full bg-amber-400 transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-muted-foreground w-8 text-left">{count}</span>
          </div>
        )
      })}
    </div>
  )
}
