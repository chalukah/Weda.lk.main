interface PageLayoutProps {
  children: React.ReactNode
  className?: string
}

export function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <div className={`bg-background min-h-screen ${className}`} suppressHydrationWarning>
      {children}
    </div>
  )
}
