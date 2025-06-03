import { auth, signIn } from '@/auth'
import BackButton from '@/components/back-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { redirect } from 'next/navigation'
import React from 'react'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email({
    message: "Email không hợp lệ"
  }),
  password: z.string().min(8)
})

const SIGNIN_ERROR_URL = '/auth/signin/error'

async function SiginPage({
  searchParams
}: { searchParams: { callbackUrl: string, message: string } }) {

  const params = await searchParams
  const session = await auth()

  if (session?.user) {
    redirect(params.callbackUrl)
  }

  async function handleSignIn(formData: FormData) {
    'use server'
    
    try {
      const validate = formSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
      })

      if (!validate.success) {
        redirect(`${SIGNIN_ERROR_URL}?error=${encodeURIComponent('Vui lòng nhập đúng email và mật khẩu (ít nhất 8 ký tự)')}&callbackUrl=${encodeURIComponent(params.callbackUrl)}`)
      } else {
        await signIn('credentials', formData)
      }

    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
        redirect("/")
      }
      throw error
    }
  }

  return (
    <form action={handleSignIn} className='space-y-2'>
      {params.message && (
        <p className='border border-blue-300 rounded-md p-2 bg-blue-100'>
          {params.message}
        </p>
      )}
      <div>
        <Label htmlFor='email'>Email</Label>
        <Input name='email' type='email' id='email' placeholder='Nhập email của bạn' />
      </div>
      <div>
        <Label htmlFor='password'>Mật khẩu</Label>
        <Input name='password' type='password' id='password' placeholder='Nhập mật khẩu' />
      </div>

      <Button type='submit' className='w-full'>Đăng nhập</Button>
      <p className="text-sm text-center">
        Bạn chưa có tài khoản? <a href="/register" className="text-blue-600 underline">Đăng ký ngay</a>
      </p>

      <BackButton />
    </form>
  )
}

export default SiginPage
