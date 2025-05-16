import React from 'react'
import { Button } from './ui/button'
import { signOut } from '@/auth'
import { cn } from '@/lib/utils'

function SignOutButton({styles}: {styles?: string}) {
  return (
    <form action={async () => {
        'use server'
        await signOut()
    }}>
        <Button type='submit' variant='ghost' className={cn(styles)}>Sign out</Button>
    </form>
  )
}

export default SignOutButton