// @/components/admin-sidebar.tsx
'use client';

import React from 'react';
import { Sidebar,SidebarContent,SidebarFooter,SidebarHeader,SidebarMenu,SidebarMenuButton,SidebarMenuItem } from './ui/sidebar';
import { Library,MapIcon,User2,Mail,BarChart,CreditCard,LogOut } from 'lucide-react';
import Link from 'next/link';
import UserButton from './user-button';

const menuItems = [
  {
    title: 'Catalog',
    url: '/admin',
    icon: Library,
  },
  {
    title: 'Categories',
    url: '/admin/categories',
    icon: MapIcon,
  },
  {
    title: 'Users',
    url: '/admin/users',
    icon: User2,
  },
  {
    title: 'Requests',
    url: '/admin/requests',
    icon: Mail,
  },
  {
    title: 'Reports',
    url: '/admin/reports',
    icon: BarChart,
  },
  {
    title: 'Payment Methods',
    url: '/admin/payment-methods',
    icon: CreditCard,
  },
];

export default function AdminSidebar() {
  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      side="left"
      className="h-full"
    >
      {/* Header */}
      <SidebarHeader className="p-0 mb-4">
        <div className="bg-black text-white p-2 text-lg font-medium text-center">
          Admin
        </div>
      </SidebarHeader>

      {/* Main menu */}
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link
                  href={item.url}
                  className="flex items-center gap-2 w-full py-2 px-3 hover:bg-gray-100 rounded"
                >
                  <item.icon className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-800">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="mt-auto border-t">
        <div className="px-3 py-4 flex flex-col gap-2">
          {/* User Profile / Logout */}
          <UserButton />

          {/* Logout Link */}
          <Link
            href="/logout"
            className="flex items-center gap-2 text-red-600 hover:text-red-800"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
