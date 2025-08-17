import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          // Check if user exists in Supabase
          const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('email', user.email)
            .single()

          if (!existingUser) {
            // Create new user in Supabase with basic fields only
            const { data: newUser, error } = await supabase
              .from('users')
              .insert({
                email: user.email,
                phone: '', // Will be updated later if needed
                password_hash: '', // OAuth users don't need password
                role: 'CUSTOMER', // Default role, can be updated after signup
                verification_status: 'VERIFIED',
                needs_role_selection: true, // Flag to show role selection flow
              })
              .select('id')
              .single()

            if (error) {
              console.error('Error creating user:', error)
              return false
            }

            // Create user profile
            if (newUser) {
              const names = user.name?.split(' ') || ['', '']
              const { error: profileError } = await supabase.from('user_profiles').insert({
                user_id: newUser.id,
                first_name: names[0] || '',
                last_name: names.slice(1).join(' ') || '',
                avatar_url: user.image,
              })

              if (profileError) {
                console.error('Error creating profile:', profileError)
                // Continue anyway - profile creation is optional
              }
            }
          }
          return true
        } catch (error) {
          console.error('Sign in error:', error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.provider = account?.provider ?? 'credentials'
      }

      // Fetch fresh user data from Supabase
      if (token.sub) {
        try {
          const { data: userData } = await supabase
            .from('users')
            .select('role, verification_status, needs_role_selection')
            .eq('email', token.email)
            .single()

          if (userData) {
            token.role = userData.role
            token.verificationStatus = userData.verification_status
            token.needsRoleSelection = userData.needs_role_selection
          }
        } catch (error) {
          console.error('Error fetching user data in JWT callback:', error)
        }
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
        session.user.provider = token.provider as string
        session.user.role = token.role as string
        session.user.verificationStatus = token.verificationStatus as string
        session.user.needsRoleSelection = token.needsRoleSelection as boolean
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  debug: process.env.NODE_ENV === 'development',
}
