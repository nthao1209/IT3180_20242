'use client'

import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'

function BackButton({ styles }: { styles?: string }) {
  const router = useRouter()
  return (
    <Button
      onClick={() => router.back()}
      variant="link"
      className={cn('inline-flex items-center gap-1', styles)}
    >
      <ArrowLeft size={16} />
      Go Back
    </Button>
  )
}

export default BackButton