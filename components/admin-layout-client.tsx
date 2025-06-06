// app/admin/admin-layout-client.tsx (HOẶC components/admin-layout-client.tsx)
"use client"; // Đánh dấu đây là Client Component

import AdminSidebar from '@/components/admin-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'; // Đường dẫn đến thư viện sidebar của bạn
import React from 'react';

interface AdminLayoutClientBoundaryProps {
  children: React.ReactNode;
  userActionsNode: React.ReactNode; // Prop để nhận UserButton (đã được render bởi Server Component)
}

export default function AdminLayoutClientBoundary({
  children,
  userActionsNode, // Nhận UserButton đã được render
}: AdminLayoutClientBoundaryProps) {
  // Tất cả logic client-side (useState, useEffect, context providers) nằm ở đây
  return (
    <SidebarProvider defaultOpen={true}> {/* SidebarProvider là Client Component */}
      <AdminSidebar
        // Truyền userActionsNode (chứa UserButton đã được render) vào AdminSidebar
        // AdminSidebar cũng là Client Component
        userActionsElement={userActionsNode}
      />
      <SidebarInset> {/* SidebarInset có thể cũng là Client Component */}
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}