import { AuthOptions, getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    // Set the session max age to 12 hours (43200 seconds)
    maxAge: 12 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account && user) {
        try {
          const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/oauth/signin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              provider: account.provider,
              provider_id: account.providerAccountId,
              image: user.image,
            }),
          });

          if (!response.ok) {
            return false;
          }

          const data = await response.json();
          user.id = data.id;
          account.access_token = data.access_token;
          account.refresh_token = data.refresh_token;
          return true;
        } catch (error) {
          console.error('Error during OAuth sign-in:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          provider: token.provider,
        },
        accessToken: token.access_token,
        refreshToken: token.refresh_token,
      };
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.provider = account.provider;
        token.sub = user.id;
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
      }
      return token;
    },
  },
};

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
