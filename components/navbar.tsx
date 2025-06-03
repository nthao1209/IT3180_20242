import React from 'react'
import UserButton from './user-button'

function Navbar() {
  return (
    <nav className="bg-black text-white w-full py-2 px-4 hidden sm:flex justify-end">
      <UserButton />
    </nav>
  )
}

export default Navbar
