import { auth, signIn } from '@/auth'
import BackButton from '@/components/back-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email"
  }),
  password: z.string().min(8)
})

const SIGNIN_ERROR_URL = '/auth/signin/error'

async function SiginPage({
  searchParams
}: {searchParams: { callbackUrl: string, message: string}}) {

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
        // error
        redirect(`${SIGNIN_ERROR_URL}?error=${encodeURIComponent('Missing credentials')}&callbackUrl=${encodeURIComponent(params.callbackUrl)}`)
      } else {
        await signIn('credentials', formData)
      }
      
    } catch(error) {
      console.log(error)
      if (error instanceof AuthError) {
        redirect(`${SIGNIN_ERROR_URL}?error=${encodeURIComponent('Invalid credentials')}&callbackUrl=${encodeURIComponent(params.callbackUrl)}`)
      }
        throw error
    }

  }
  return (
    <form action={handleSignIn} className='space-y-2'>
      {params.message && <p className='border border-blue-300 rounded-md p-2 bg-blue-100'>{params.message}</p>}
        <div>
            <Label htmlFor='email'>Email</Label>
            <Input name='email' type='email' id='email' placeholder='Email' />
        </div>
        <div>
            <Label htmlFor='password'>Password</Label>
            <Input name='password' type='password' id='password' placeholder='Password' />
            <p className='text-sm text-gray-400 pt-1 pb-2'>If you are a member use your 10 digits library card #.</p>
        </div>
        
        <Button type='submit' className='w-full'>Sign in</Button>
        <BackButton />
    </form>
  )
}   

export default SiginPage