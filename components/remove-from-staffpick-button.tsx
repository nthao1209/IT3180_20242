'use client'

import React from 'react'
import { Button } from './ui/button'
import { removeFromStaffPicks } from '@/actions/actions'
import { usePathname } from 'next/navigation'

function RemoveFromStaffPickButton({ pick_id }: {pick_id: number}) {
    const path = usePathname()

    const handleRemove = async () => {
        await removeFromStaffPicks(pick_id, path)
    }
  return (
    <Button  onClick={handleRemove}>Remove from staff pick</Button>
  )
}

export default RemoveFromStaffPickButton