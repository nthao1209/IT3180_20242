// @/components/admin-sidebar.tsx
// THIS FILE IS LARGELY CORRECT.
// The "fix" for layout is in AdminLayout.tsx

import React from 'react';
import {
  Sidebar, // This is the main <Sidebar> component from your library
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar'; // Assuming this is the correct path
import { Library, MapIcon, User2, Mail } from 'lucide-react';
import Link from 'next/link';
import UserButton from './user-button'; // Ensure this component is styled appropriately

const menu_items = [
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
];

function AdminSidebar() {
  return (
    // The <Sidebar> component from your library is used here.
    // It will render the placeholder and the fixed positioned visual sidebar.
    <Sidebar
      variant="floating" // This variant makes the sidebar "float" with rounded corners and a shadow.
      collapsible="icon"  // Allows collapsing to icon-only mode.
      side="left"         // Default is "left", but good to be explicit.
      // className="p-0" // This might not be necessary or could be removed if variant="floating" handles its own outer spacing/appearance.
                          // The padding inside the floating box is handled by its child elements.
    >
      <SidebarHeader className="p-0 mb-4"> {/* p-0 overrides default p-2, mb-4 is fine */}
        <p className="text-lg bg-black text-white p-2">Admin</p>
      </SidebarHeader>

      <SidebarContent> {/* This has default p-2, which is usually good */}
        <SidebarMenu>
          {menu_items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                {/* Added tooltip prop for when sidebar is collapsed */}
                <Link
                  href={item.url}
                  // className="flex items-center gap-2 w-full" // SidebarMenuButton already applies flex, gap, etc. This might be redundant.
                >
                  <item.icon className="h-4 w-4" /> {/* Explicit icon sizing can be good */}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter> {/* This has default p-2 */}
        <SidebarMenu>
          <SidebarMenuItem>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AdminSidebar;