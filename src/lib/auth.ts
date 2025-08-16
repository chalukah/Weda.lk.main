import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '@/lib/db'
import { UserRole, VerificationStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            include: { profile: true },
          })

          if (!user) {
            return null
          }

          const isValid = await bcrypt.compare(credentials.password, user.passwordHash)

          if (!isValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.profile ? `${user.profile.firstName} ${user.profile.lastName}` : user.email,
            role: user.role,
            verificationStatus: user.verificationStatus,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.verificationStatus = user.verificationStatus
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
        session.user.role = token.role as UserRole
        session.user.verificationStatus = token.verificationStatus as VerificationStatus
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  debug: process.env.NODE_ENV === 'development',
}
