import React from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

function RegisterButton({ styles }: { styles?: string }) {
  return (
    <form
      action={async (formData: FormData) => {
        'use server'
      }}
    >
      <Button type='submit' variant='ghost' className={cn(styles)}>
        Register now
      </Button>
    </form>
  )
}

export default RegisterButton
