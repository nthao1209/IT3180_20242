import AdminSidebar from '@/components/admin-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

function AdminLayout({ children }: { children: React.ReactNode}) {
  return (
    <div className='p-2 space-y-2'>
        <SidebarProvider>
            <AdminSidebar />
            <div className="container">
                {children}
            </div>

        </SidebarProvider>

    </div>
  )
}

export default AdminLayout