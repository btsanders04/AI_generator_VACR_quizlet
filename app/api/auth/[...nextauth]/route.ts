import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Only assign role for specific GitHub users who should have admin access
      if (["btsanders04"].find(user => account?.userId === user)) {
        token.role = "admin"; // You might want to check specific GitHub usernames here
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/', // Use the main page for sign in
  },
});

export { handler as GET, handler as POST };
