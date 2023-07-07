import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { type Adapter } from 'next-auth/adapters';

import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

import prisma from '@/lib/prisma';
import { authActions } from '@/actions';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma) as Adapter,
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID || '',
			clientSecret: process.env.GITHUB_SECRET || '',
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'user@google.com' },
				password: { label: 'Password', type: 'password', placeholder: '******' },
			},
			async authorize(credentials) {
				const user = await authActions.signInEmailPassword(credentials!.email, credentials!.password);
				return user ?? null;
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},

	callbacks: {
		async signIn({ user }) {
			// console.log({user});
			return true;
		},

		async jwt({ token, user, account, profile }) {
			// console.log({ token });
			const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } });

			token.id = dbUser?.id ?? 'no-uuid';

			return token;
		},

		async session({ session, token, user }) {
			if (session && session.user) {
				session.user.id = token.id;
			}

			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
