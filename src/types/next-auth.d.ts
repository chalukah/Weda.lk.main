import { DefaultSession } from 'next-auth'
import { UserRole, VerificationStatus } from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: UserRole
      verificationStatus: VerificationStatus
    } & DefaultSession['user']
  }

  interface User {
    id: string
    email: string
    role: UserRole
    verificationStatus: VerificationStatus
  }

  interface JWT {
    role: UserRole
    verificationStatus: VerificationStatus
  }
}
