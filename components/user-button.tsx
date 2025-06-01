import { auth } from '@/auth'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { ChevronUp, User2 } from 'lucide-react'
import Link from 'next/link'
import SignInButton from './signin-button'
import SignOutButton from './signout-button'
import { SidebarMenuButton, SidebarProvider } from './ui/sidebar'

async function UserButton() {
    const session = await auth()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarProvider>
                    <SidebarMenuButton>
                        <User2 /><p className='capitalize'>{session?.user?.name?.split(' ')[0]}</p>
                        <ChevronUp className='ml-auto'/>
                    </SidebarMenuButton>
                </SidebarProvider>
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
                    session?.user && session.user.role === 'member' && 
                    <DropdownMenuItem>
                        <Link href={'/my-account'} className='p-2'>My Account</Link>
                    </DropdownMenuItem>
                }         
       
                <DropdownMenuItem>
                    <Link href='/profile' className='p-2'>Profile</Link>
                </DropdownMenuItem>

                
                {
                    session?.user && 
                    <DropdownMenuItem>
                        <SignOutButton styles='pl-2' />
                    </DropdownMenuItem>
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton