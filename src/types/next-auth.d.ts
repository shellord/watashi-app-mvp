import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string | null
      username?: string | null
      name?: string | null | undefined
      email?: string | null | undefined
      image?: string | null | undefined
    }
  }
}
