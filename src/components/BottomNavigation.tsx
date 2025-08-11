'use client'

import { Search, Calendar, MessageCircle, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface BottomNavigationProps {
  userType?: 'customer' | 'provider'
  className?: string
}

export function BottomNavigation({ userType = 'customer', className }: BottomNavigationProps) {
  const [activeTab, setActiveTab] = useState(0)

  const customerTabs = [
    { icon: Search, label: 'Search', href: '/' },
    { icon: Calendar, label: 'Bookings', href: '/bookings' },
    { icon: MessageCircle, label: 'Messages', href: '/messages' },
    { icon: User, label: 'Profile', href: '/profile' },
  ]

  const providerTabs = [
    { icon: Calendar, label: 'Calendar', href: '/provider/calendar' },
    { icon: MessageCircle, label: 'Requests', href: '/provider/requests' },
    { icon: MessageCircle, label: 'Earnings', href: '/provider/earnings' },
    { icon: User, label: 'Profile', href: '/provider/profile' },
  ]

  const tabs = userType === 'customer' ? customerTabs : providerTabs

  return (
    <nav
      className={cn(
        'border-border bg-background/95 fixed right-0 bottom-0 left-0 z-50 border-t backdrop-blur-md md:hidden',
        className
      )}
    >
      <div className="grid grid-cols-4 gap-1 px-2 py-2">
        {tabs.map((tab, index) => {
          const Icon = tab.icon
          const isActive = activeTab === index

          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(index)}
              className={cn(
                'flex flex-col items-center justify-center rounded-lg px-2 py-2 transition-all duration-200',
                'min-h-[64px] text-xs font-medium',
                isActive
                  ? 'text-primary bg-primary/10 scale-105'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              <Icon
                className={cn('mb-1 h-6 w-6 transition-all duration-200', isActive && 'scale-110')}
              />
              <span className="leading-none">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
