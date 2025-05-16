import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { Library, MapIcon, PartyPopper, Receipt, User2, Home, Settings } from 'lucide-react'
import Link from 'next/link'
import UserButton from './user-button'

const menu_items = [
    {
        title: 'Home',
        url: '/',
        icon: Home
    },
    {
        title: 'Catalog',
        url: '/catalog',
        icon: Library
    },
    {
        title: 'Locations',
        url: '/locations',
        icon: MapIcon
    },
    {
        title: "Activities",
        url: "/activities",
        icon: PartyPopper,
    },
    {
        title: "Library resources",
        url: "#",
        icon: Settings,
    },

]
function MemberSidebar() {
  return (
    
    <Sidebar variant='floating'>
        <SidebarHeader className='p-0 mb-4'>
            <p className='text-lg bg-black text-white p-2'>The library</p>
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
                    { <UserButton /> }
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>

    </Sidebar>
  )
}

export default MemberSidebar