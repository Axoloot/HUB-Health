import NextAuth from 'next-auth';
import User from '../../../lib/models/User';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: '1234',
  debug: true,
  pages: {
    signIn: '/',
    error: '/',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const user = await User.findOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) return user;
        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
