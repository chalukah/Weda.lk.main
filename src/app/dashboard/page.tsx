import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { RoleSelection } from '@/components/RoleSelection'
import DashboardClient from './dashboard-client'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/en/login')
  }

  if (session?.user?.needsRoleSelection) {
    return (
      <div className="bg-background min-h-screen">
        <Navbar />
        <main className="pt-16">
          <div className="min-h-[calc(100vh-4rem)]">
            <RoleSelection />
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return <DashboardClient session={session} />
}
