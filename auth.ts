import NextAuth, { DefaultSession } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './lib/prisma'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

declare module 'next-auth' {

    interface Session {
        user:{
            role?: string
            username?: string
        }& DefaultSession['user']
    }

    interface User{
        role?:string
        username?: string
    }
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

                if (!credentials) return null;


                user = await prisma.users.findUnique({
                    where: {
                        email:credentials.email as string
                    }

                })

                if (!user){
                    throw new Error('Invalid credentials')
                }else{
                    if(user.role === 'staff'){
                        const passwordMatch = await bcrypt.compare(
                            credentials.password as string, user.password
                        )

                        if (!passwordMatch){
                            throw new Error('Invalid credentials')
                        }
                    }else if(user.role === 'member'){
                        const passwordMatch = await bcrypt.compare(
                            credentials.password as string, user.password
                        )

                        if (!passwordMatch){
                            throw new Error('Invalid credentials')
                        }
                    }
            }

                return user
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60      
    },
    callbacks: {
        async jwt({ token, user }: { token: any; user?: any }) {
            if(user){
                token.id = user.id
                token.email = user.email
                token.name = user.name
                token.username = user.username
                token.role = user.role
            }

            return token
        },
        async session({ session, token }: { session: DefaultSession; token: any }) {

            if (session && session.user){
                session.user.id = token.id as string
                session.user.email = token.email as string
                session.user.name = token.name
                session.user.username = token.username
                session.user.role = token.role as string
            }

            return session
        }
    },
    pages: {
        signIn: '/auth/signin',
    },
    basePath: '/auth',
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