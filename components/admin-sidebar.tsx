import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { Library, MapIcon, User2, Mail } from 'lucide-react'
import Link from 'next/link'
import UserButton from './user-button'
// import { request } from 'http'


const menu_items = [
    {
        title: 'Catalog',
        url: '/admin',
        icon: Library
    },
    {
        title: 'Categories',
        url: '/admin/categories',
        icon: MapIcon
    },
    // {
    //     title: 'Activities',
    //     url: '/admin/activities',
    //     icon: PartyPopper
    // },
    {
        title: 'Users',
        url: '/admin/users',
        icon: User2
    },
    // {
    //     title: 'Fines',
    //     url: '/admin/fines',
    //     icon: Receipt
    // },
    {
        title: 'Requests',
        url: '/admin/requests',
        icon: Mail
    }

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
                                  <Link href={item.url} legacyBehavior>
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
                      <UserButton />
                  </SidebarMenuItem>
              </SidebarMenu>
          </SidebarFooter>
      </Sidebar>
  );
}

export default AdminSidebar