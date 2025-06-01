import Link from 'next/link'
import React from 'react'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from './ui/navigation-menu'
import { addWeeks, format } from 'date-fns'
import { User2Icon, Heart } from 'lucide-react'
import UserButton from './user-button'

function Navbar() {

  const from = format(new Date(), 'yyyy-MM-dd')
  const to = format(addWeeks(new Date(), 2), 'yyyy-MM-dd')

  return (
    <nav className='bg-black text-white w-full hidden sm:block'>
      <div className='container mx-auto flex justify-between items-center py-4'>
        <div className='flex items-center space-x-8'>
          <Link href='/' className='hover:text-gray-400'>
            Cataloge
          </Link>
          <Link href='/locations' className='hover:text-gray-400'>
            Locations
          </Link>
          <Link href={`/activities?from=${from}&to=${to}`} className='hover:text-gray-400'>
            Activities
          </Link>
          <Link href='/favorites' className='hover:text-gray-400 flex items-center gap-1'>
            <Heart className="h-4 w-4" />
            Favorites
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Library resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div>
          <UserButton />
          {/* <User2Icon size={16}/> */}
        </div>

      </div>
    </nav>
  );
}

export default Navbar