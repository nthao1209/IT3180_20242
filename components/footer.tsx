import React from 'react'
import { Separator } from './ui/separator'
import Link from 'next/link'

function Footer() {
  return (
    <footer className='bg-black p-8 space-y-2'>
        <div className='text-white flex space-x-4 text-sm md:text-base'>
            <Link href='#'>Contact us</Link>
            <Link href='#'>Privacy and terms</Link>
            <Link href='#'>Accessibility</Link>
        </div>
        
        <Separator />
        <div className='text-white flex space-x-4 text-sm md:text-base'>
            <Link href='#'>Privacy statement</Link>
            <Link href='#'>Terms of use</Link>
            <Link href='#'>Accessibility statements</Link>
        </div>
    </footer>
  )
}

export default Footer