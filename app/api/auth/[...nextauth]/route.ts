import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma" // hoặc đường dẫn đến Prisma client của bạn
import bcrypt from "bcrypt"

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Partial<Record<"email" | "password", unknown>>) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.users.findUnique({
          where: { email: credentials.email as string }
        })

        if (!user) return null

        const isValid = await bcrypt.compare(credentials.password as string, user.password)
        if (!isValid) return null

        return {
          id: user.user_id.toString(),
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      // Mỗi lần lấy session sẽ fetch user mới nhất từ DB
      if (session?.user?.email) {
        const user = await prisma.users.findUnique({
          where: { email: session.user.email }
        })
        if (user) {
          session.user.id = user.user_id.toString()
          session.user.name = user.name
          session.user.role = user.role
        }
      }
      return session
    },
    async jwt({ token, user }) {
        // Khi login lần đầu, thêm dữ liệu user vào token
        if (user) {
        token.id = user.id
        token.role = user.role
        }

        // Luôn cập nhật thông tin user mới nhất từ DB
        if (token?.email) {
            const updatedUser = await prisma.users.findUnique({
            where: { email: token.email as string }
            })
            if (updatedUser) {
            token.name = updatedUser.name
            token.role = updatedUser.role
            token.id = updatedUser.user_id.toString()
            }
        }

        return token
    }
  },
  session: {
    strategy: "jwt", // hoặc "database" tùy bạn
  },
  secret: process.env.NEXTAUTH_SECRET
})
