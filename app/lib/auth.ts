import { DefaultSession, NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { get } from '@vercel/edge-config'

declare module "next-auth" {
    interface Session extends DefaultSession {
      user: {
        id: string;
        role?: string;
      } & DefaultSession["user"]
    }
  }

async function isUserAdmin(user: string): Promise<boolean> {
try {
    const adminUsers = await get('adminUsers') as string[]
    return adminUsers.includes(user)
} catch (error) {
    console.error('Failed to fetch admin users from Edge Config:', error)
    return false
}
}

  
export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      const isAdmin = await isUserAdmin(account?.userId ?? '')
      if (isAdmin) {
        token.role = "admin";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    }
  }
};

// Add this export to make it a proper module
export default authOptions;