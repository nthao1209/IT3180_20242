'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { PlusIcon } from 'lucide-react'
import AddActivityDialog from './add-activity-dialog'

function AddActivityButton() {
    const [open, setOpen] = useState(false)

  return (
    <div className='flex flex-col'>
        <Button className='self-end' onClick={() => setOpen(true)}>
            <PlusIcon />Add activity</Button>
            <AddActivityDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default AddActivityButton