import '@/lib/database';
import NextAuth, { SessionStrategy } from 'next-auth';
import User from '@/lib/models/User';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions = {
  session: {
    strategy: `jwt` as SessionStrategy,
  },
  secret: `1234`,
  debug: true,
  pages: {
    signIn: `/`,
    error: `/`,
  },
  providers: [
    CredentialsProvider({
      name: `credentials`,
      credentials: {
        email: { label: `Email`, type: `text` },
        password: { label: `Password`, type: `password` },
      },
      async authorize(credentials) {
        if (!credentials) return;
        const user = await User.findOne({ email: credentials.email });
        if (user && bcrypt.compareSync(credentials.password, user.password))
          return user;
        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
