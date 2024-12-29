'use client'

import React from 'react'
import { Button } from './ui/button'
import { createCheckoutSession } from '@/actions/actions'

function PayFineButton({
    fine_id
}: { fine_id: number}) {

    const handlePaynow = async () => {
        const fd = new FormData()
        fd.set('fine_id', `${fine_id}`)

        await createCheckoutSession(fd)
    }
  return (
    <Button onClick={handlePaynow}>Pay now</Button>
  )
}

export default PayFineButton