import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from '@/lib/mongodb'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  //   pages: {
  //     signIn: '/login',
  //   },
  session: async ({ session, user }) => {
    if (session?.user) {
      session.user.id = user.id || user._id;
    }
    return session;
  },
  secret: 'supersecret',
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }