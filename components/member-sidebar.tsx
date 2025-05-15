import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { BookCheck, Home, IdCard, Library, MapIcon, PartyPopper, Settings, Stamp } from 'lucide-react'
import Link from 'next/link'
import UserButton from './user-button'

// Menu items.
const menu_items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Catalog",
        url: "/cataloge",
        icon: Library,
    },
    {
        title: "Locations",
        url: "/locations",
        icon: MapIcon,
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

const resources_items = [
    {
        title: "Library card",
        url: "/",
        icon: IdCard,
    },
    {
        title: "Equipment rental",
        url: "/equipment-rental",
        icon: Stamp,
    },
    {
        title: "Book a room",
        url: "/book-a-room",
        icon: BookCheck,
    }
]

function MemberSidebar() {
    return (

        <Sidebar variant='floating'>
            <SidebarHeader className='p-0 mb-4'>
                <p className='text-lg bg-black text-white p-2'>The Library</p>
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
                <SidebarGroup>
                    <SidebarGroupLabel>Library resources</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                resources_items.map(item => (
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
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <UserButton />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            
        </Sidebar>
    )
}

export default MemberSidebar