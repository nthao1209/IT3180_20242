import NextAuth, { DefaultSession } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './lib/prisma'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

declare module 'next-auth' {

                ////////////////////////////
                // Please watch the video
                ////////////////////////////
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    debug: true,
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {

                let user = null
                
                ////////////////////////////
                // Please watch the video
                ////////////////////////////
                return user
            }
        })
    ],
    session: {
                ////////////////////////////
                // Please watch the video
                ////////////////////////////
    },
    callbacks: {
        async jwt({ token, user }) {

                ////////////////////////////
                // Please watch the video
                ////////////////////////////

            return token
        },
        async session({ session, token }) {

            
                ////////////////////////////
                // Please watch the video
                ////////////////////////////

            return session
        }
    },
    pages: {
        signIn: '/auth/signin'
    },
    basePath: // watch the video,
    logger: {
        error(code, ...message) {
            console.error(code, message)
        },
        warn(code, ...message) {
            console.warn(code, message)
        },
        debug(code, ...message) {
            console.debug(code, message)
        },
    },
})

// auth, middleware