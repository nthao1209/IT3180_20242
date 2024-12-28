'use client'

import BackButton from '@/components/back-button'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

function SigninErrorPage() {
    const searchParams = useSearchParams()
    //const router = useRouter()
    const error = searchParams.get('error')
    //const callbackUrl = searchParams.get('callbackUrl')

  return (
    <>
        <h1>Error</h1>
        <p>An error occurred while signing in</p>
        <p className='text-red-500'>{error}</p>
        <BackButton />
    </>
  )
}

export default SigninErrorPage