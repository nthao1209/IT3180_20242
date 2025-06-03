import { auth } from '@/auth'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { ChevronDown, User2 } from 'lucide-react'
import Link from 'next/link'
import SignInButton from './signin-button'
import SignOutButton from './signout-button'
import { SidebarMenuButton, SidebarProvider } from './ui/sidebar'

async function UserButton() {
    const session = await auth()

    return (
        <DropdownMenu>
           <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors">
            <User2 className="text-gray-600" />
            <span className="capitalize font-medium text-gray-800">
                {session?.user?.name?.split(' ')[0] || 'Guest'}
            </span>
            <ChevronDown className="text-gray-500" />
            </button>
        </DropdownMenuTrigger>
            <DropdownMenuContent side='top' className='w-[150px]'>
                {
                    !session && 
                    <div>
                        <DropdownMenu>
                            <Link href={'/register'} className='p-2'>Register now</Link>
                        </DropdownMenu>
                        
                        <DropdownMenuItem>
                            <SignInButton styles='pl-2'/>
                        </DropdownMenuItem>
                    </div>
                    
                }
                {
                    session?.user && session.user.role === 'staff' && 
                    <DropdownMenuItem>
                        <Link href={'/admin'} className='p-2'>Dashboard</Link>
                    </DropdownMenuItem>
                }
                   
                {
                    session?.user && 
                <div> 
                    <DropdownMenuItem>
                        <Link href='/profile' className='p-2'>Profile</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <SignOutButton styles='pl-2' />
                    </DropdownMenuItem>
                </div>
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton