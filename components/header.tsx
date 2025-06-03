import React from 'react'
import Logo from './logo'
import SearchBar from './search-bar'
import { SidebarTrigger } from './ui/sidebar'

function Header() {
  return (
    <>
      <header className='py-2 lg:py-4 container mx-auto '>
        {/* mobile */}
        <div className="flex sm:hidden flex-col justify-between p-2">
          <div className="flex items-center">
            {/* logo */}
            <Logo />
            {/* sidebar trigger */}
            {/* <SidebarTrigger className='flex md:hidden ml-2'/> */}
          </div>

          <SearchBar />
        </div>

        {/* desktop */}
        <div className="hidden sm:flex items-center justify-between">

          {/* logo */}
          <Logo />

          <SearchBar />
        </div>
      </header>
    </>
  )
}

export default Header