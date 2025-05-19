'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { PlusIcon } from 'lucide-react'
import AddBookDialog from './add-book-dialog'

function AddBookButton() {
    const [open, setOpen] = useState(false)

  return (
    <div className='flex flex-col'>
        <Button className='self-end' onClick={() => setOpen(true)}>
            <PlusIcon />Add book</Button>
        <AddBookDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default AddBookButton