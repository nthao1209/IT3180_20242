import React from 'react'
import { Button } from './ui/button'
import { signIn } from '@/auth'
import { cn } from '@/lib/utils'

function SignInButton({styles}: {styles?: string}) {
  return (
    <form action={async () => {
        'use server'
        await signIn()
    }}>
        <Button type='submit' variant='ghost' className={cn(styles)}>Sign in</Button>
    </form>
  )
}

export default SignInButton