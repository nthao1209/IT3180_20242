'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { PlusIcon } from 'lucide-react'
import AddUserDialog from './add-user-dialog'

function AddUserButton() {
    const [open, setOpen] = useState(false)

  return (
    <div className='flex flex-col'>
        <Button className='self-end' onClick={() => setOpen(true)}>
            <PlusIcon />Add user</Button>
        <AddUserDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default AddUserButton