import NextAuth from "next-auth/next";

import GithubProvider from "next-auth/providers/github"
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'

export default NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET
		}),
		AppleProvider({
			clientId: process.env.APPLE_ID,
			clientSecret: process.env.APPLE_SECRET
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_ID,
			clientSecret: process.env.FACEBOOK_SECRET
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET
		}),
		// EmailProvider({
		// 	server: process.env.EMAIL_SERVER,
		// 	from: process.env.EMAIL_FROM
		// }),
	]
});
