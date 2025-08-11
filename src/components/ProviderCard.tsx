'use client'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { TrustBadge, VerificationStatus } from './TrustBadge'
import { RatingDisplay } from './RatingDisplay'
import { MapPin, Clock, Phone, MessageCircle, Heart, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export interface Provider {
  id: string
  name: string
  image?: string
  rating: number
  reviewCount: number
  distance: string
  responseTime: string
  services: string[]
  priceRange: string
  verifications: VerificationStatus[]
  location: string
  isOnline: boolean
  isAvailable: boolean
  profileImage?: string
  description?: string
}

interface ProviderCardProps {
  provider: Provider
  variant?: 'compact' | 'expanded' | 'minimal'
  onBook?: (providerId: string) => void
  onContact?: (providerId: string) => void
  onFavorite?: (providerId: string) => void
  isFavorited?: boolean
  showPricing?: boolean
  className?: string
}

export function ProviderCard({
  provider,
  variant = 'compact',
  onBook,
  onContact,
  onFavorite,
  isFavorited = false,
  showPricing = true,
  className,
}: ProviderCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getStatusColor = () => {
    if (!provider.isOnline) return 'bg-gray-400'
    if (provider.isAvailable) return 'bg-green-400'
    return 'bg-yellow-400'
  }

  const getStatusText = () => {
    if (!provider.isOnline) return 'Offline'
    if (provider.isAvailable) return 'Available'
    return 'Busy'
  }

  if (variant === 'minimal') {
    return (
      <Card
        className={cn(
          'cursor-pointer transition-all duration-200 hover:shadow-md',
          'border-border bg-card border',
          className
        )}
      >
        <CardContent className="p-3">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={provider.profileImage} alt={provider.name} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {provider.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  'border-background absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2',
                  getStatusColor()
                )}
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-foreground truncate text-sm font-medium">{provider.name}</h3>
              <div className="flex items-center space-x-2">
                <RatingDisplay
                  rating={provider.rating}
                  reviewCount={provider.reviewCount}
                  variant="compact"
                  size="sm"
                />
              </div>
            </div>

            <div className="flex space-x-1">
              {provider.verifications.slice(0, 2).map((verification) => (
                <TrustBadge key={verification} type={verification} size="sm" showTooltip={false} />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg',
        'border-border bg-card overflow-hidden border',
        variant === 'expanded' && 'max-w-md',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        {variant === 'expanded' && provider.image && (
          <div className="relative h-32 w-full overflow-hidden">
            <img
              src={provider.image}
              alt={`${provider.name} work sample`}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <Button
                variant="ghost"
                size="sm"
                className="bg-background/80 hover:bg-background h-8 w-8 rounded-full backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onFavorite?.(provider.id)
                }}
              >
                <Heart
                  className={cn(
                    'h-4 w-4',
                    isFavorited ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
                  )}
                />
              </Button>
            </div>
          </div>
        )}

        <div className="p-4">
          {/* Header */}
          <div className="mb-3 flex items-start space-x-3">
            <div className="relative flex-shrink-0">
              <Avatar className={variant === 'expanded' ? 'h-12 w-12' : 'h-10 w-10'}>
                <AvatarImage src={provider.profileImage} alt={provider.name} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {provider.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  'border-background absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2',
                  getStatusColor()
                )}
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-foreground truncate font-semibold">{provider.name}</h3>
                  <p className="text-muted-foreground mt-1 flex items-center text-sm">
                    <MapPin className="mr-1 h-3 w-3" />
                    {provider.location} • {provider.distance}
                  </p>
                </div>
                {variant !== 'expanded' && !provider.image && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-muted h-8 w-8 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      onFavorite?.(provider.id)
                    }}
                  >
                    <Heart
                      className={cn(
                        'h-4 w-4',
                        isFavorited ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
                      )}
                    />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Status and Response Time */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">
                {getStatusText()}
              </Badge>
              <span className="text-muted-foreground flex items-center text-xs">
                <Clock className="mr-1 h-3 w-3" />
                {provider.responseTime}
              </span>
            </div>

            <RatingDisplay
              rating={provider.rating}
              reviewCount={provider.reviewCount}
              variant="compact"
              size="sm"
              showVerifiedIndicator={provider.reviewCount > 10}
            />
          </div>

          {/* Services */}
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {provider.services.slice(0, 3).map((service) => (
                <Badge key={service} variant="outline" className="text-xs">
                  {service}
                </Badge>
              ))}
              {provider.services.length > 3 && (
                <Badge variant="outline" className="text-muted-foreground text-xs">
                  +{provider.services.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* Pricing */}
          {showPricing && (
            <div className="mb-3">
              <p className="text-foreground text-sm font-medium">
                Starting from {provider.priceRange}
              </p>
            </div>
          )}

          {/* Verifications */}
          <div className="mb-4 flex flex-wrap gap-2">
            {provider.verifications.map((verification) => (
              <TrustBadge key={verification} type={verification} size="sm" />
            ))}
          </div>

          {/* Description for expanded variant */}
          {variant === 'expanded' && provider.description && (
            <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
              {provider.description}
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="space-x-2 p-4 pt-0">
        <Button
          size="sm"
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation()
            onBook?.(provider.id)
          }}
        >
          Book Service
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            onContact?.(provider.id)
          }}
        >
          <MessageCircle className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            onContact?.(provider.id)
          }}
        >
          <Phone className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
