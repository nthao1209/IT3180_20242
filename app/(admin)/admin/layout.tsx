// /admin/layout.tsx

"use client";

import AdminSidebar from '@/components/admin-sidebar'; // Your component defined above
import {
  SidebarProvider,
  SidebarInset,
  // SidebarTrigger // Optional: if you want a manual trigger button outside the sidebar
} from '@/components/ui/sidebar'; // Adjust path to your sidebar library
import React from 'react';

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}> {/* Sidebar starts open */}
      {/* Your AdminSidebar component, which renders the <Sidebar> from the library */}
      <AdminSidebar />

      {/* SidebarInset is the main content area that respects the sidebar */}
      <SidebarInset>
        <div className="container mx-auto p-4 md:p-6 lg:p-8"> {/* Content padding and centering */}
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AdminLayout;