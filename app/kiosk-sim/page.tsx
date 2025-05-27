'use client'

import { checkinBook, checkoutBook, State } from '@/actions/actions'
import BackButton from '@/components/back-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import React, { useActionState } from 'react'

function KioskPage() {
  const initialState: State = { message: null }
  const [stateCheckout, formActionCheckout] = useActionState(checkoutBook, initialState)
  const [stateCheckin, formActionCheckin] = useActionState(checkinBook, initialState)

  return (
    <div className='container mx-auto mt-32 max-w-md border border-slate-300 rounded-md shadow-md"'>
      {stateCheckout.message &&
        <p className='border border-blue-300 rounded-md p-2 bg-blue-100'>{stateCheckout.message}</p>}
      <form action={formActionCheckout}>
        <div className="p-8 space-y-2">
          <BackButton />
          <h1 className="text-2xl font-bold mb-4 text-center">Kiosk simulator</h1>

          <div>
            <Label htmlFor='library_card_no'>Library card no</Label>
            <Input name='library_card_no' id='library_card_no' type='text' />
          </div>

          <div>
            <Label htmlFor='isbn'>ISBN #</Label>
            <Input name='isbn' id='isbn' type='text' />
          </div>

          <Button type='submit' className='w-full'>Checkout</Button>
        </div>
      </form>

      <Separator />

      <form action={formActionCheckin}>
        {stateCheckin.message &&
          <p className='border border-blue-300 rounded-md p-2 bg-blue-100'>{stateCheckin.message}</p>}
        <div className="p-8 space-y-2">
          <div>
            <Label htmlFor='isbn'>ISBN #</Label>
            <Input name='isbn' id='isbn' type='text' />
          </div>

          <Button type='submit' className='w-full'>Checkin</Button>
        </div>

      </form>
    </div>
  )
}

export default KioskPage