
import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { Library } from 'lucide-react'
import Link from 'next/link'
import UserButton from './user-button' // Giả sử bạn đã có component UserButton
const menu_items = [
    {   title: 'Catalog',
        url: '/author',
        icon: Library  }]


        function AuthorSidebar() {
            return (
                <Sidebar variant='floating' className='p-0'>
                    <SidebarHeader className='p-0 mb-4'>
                        <p className='text-lg bg-black text-white p-2'>Author</p>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarMenu>
                            {
                                menu_items.map(item => (
            
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                        <Link href={item.url} className="no-underline">
                                            <span className="flex items-center gap-2">
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </span>
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
          
          export default AuthorSidebar
