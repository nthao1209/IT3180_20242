// @/components/admin-sidebar.tsx
'use client'; // Giữ nguyên đây là Client Component

import React from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'; // Đảm bảo đường dẫn đúng
import { Library, MapIcon, User2, Mail, BarChart } from 'lucide-react'; // Bỏ CreditCard, LogOut nếu không dùng trực tiếp ở đây
import Link from 'next/link';
// KHÔNG import UserButton trực tiếp ở đây nữa
// import UserButton from './user-button';

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
];

// Định nghĩa kiểu cho props của AdminSidebar
interface AdminSidebarProps {
  userActionsElement?: React.ReactNode; // Prop để nhận UserButton (hoặc bất kỳ ReactNode nào khác)
}

export default function AdminSidebar({ userActionsElement }: AdminSidebarProps) { // Nhận prop userActionsElement
  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      side="left"
      className="h-full" // Đảm bảo Sidebar có chiều cao để footer dính xuống dưới
    >
      {/* Header */}
      <SidebarHeader className="p-0 mb-4">
        <div className="bg-black text-white p-2 text-lg font-medium text-center">
          Admin
        </div>
      </SidebarHeader>

      {/* Main menu */}
      <SidebarContent className="flex-grow"> {/* flex-grow để nội dung chính chiếm không gian còn lại */}
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
      <SidebarFooter className="mt-auto border-t border-gray-200"> {/* Thêm border-gray-200 cho đẹp hơn */}
        <div className="px-3 py-4 flex flex-col gap-2">
          {/* User Profile / Logout được truyền từ component cha */}
          {userActionsElement} {/* Sử dụng prop đã truyền vào */}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}