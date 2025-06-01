'use client'

import React from 'react'
import { Button } from './ui/button'
import { placeHold } from '@/actions/actions'
import { usePathname } from 'next/navigation'

function PlaceHoldButton({ book_id }: { book_id: number }) {
  const path = usePathname()

  const handleCancelHold = async () => {
    await placeHold(book_id, path)
  }
  return (
    <Button
      variant='ghost'
      className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 text-center'
      onClick={handleCancelHold}
    >Place hold</Button>
  )
}

export default PlaceHoldButton