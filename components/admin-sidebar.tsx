import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { Library, MapIcon, PartyPopper, Receipt, User2 } from 'lucide-react'
import Link from 'next/link'
import UserButton from './user-button'

const menu_items = [
    {
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/search-and-read
        title: 'Catalog',
        url: '/admin',
        icon: Library
    },
    {
<<<<<<< HEAD
>>>>>>> origin/author
=======
>>>>>>> origin/search-and-read
        title: 'Categories',
        url: '/admin/categories',
        icon: MapIcon
    },
    {
        title: 'Activities',
        url: '/admin/activities',
        icon: PartyPopper
    },
    {
        title: 'Users',
        url: '/admin/users',
        icon: User2
    },
    {
        title: 'Fines',
        url: '/admin/fines',
        icon: Receipt
    },

]
function AdminSidebar() {
  return (
    
    <Sidebar variant='floating' className='p-0'>
        <SidebarHeader className='p-0 mb-4'>
            <p className='text-lg bg-black text-white p-2'>Admin</p>
        </SidebarHeader>
        <SidebarContent>
            <SidebarMenu>
                {
                    menu_items.map(item => (

                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <Link href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))
                }
            </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
<<<<<<< HEAD
<<<<<<< HEAD
                    { <UserButton /> }
=======
                    <UserButton />
>>>>>>> origin/author
=======
                    <UserButton />
>>>>>>> origin/search-and-read
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>

    </Sidebar>
  )
}

export default AdminSidebar