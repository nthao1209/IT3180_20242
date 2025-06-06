// app/admin/layout.tsx
// KHÔNG CÓ "use client"; ở đây, đây là Server Component

import UserButton from '@/components/user-button'; // Import Server Component UserButton
import AdminLayoutClientBoundary from '@/components/admin-layout-client'; // Import Client Boundary component
import React, { Suspense } from 'react';

export default async function AdminLayout({ // Đây là async Server Component
  children,
}: {
  children: React.ReactNode;
}) {
  // Logic phía server có thể được thực hiện ở đây nếu cần

  return (
    // AdminLayoutClientBoundary là Client Component, nó sẽ xử lý SidebarProvider
    <AdminLayoutClientBoundary
      userActionsNode={ // Truyền UserButton (Server Component) vào Client Boundary
        // UserButton là async, cần Suspense
        <Suspense fallback={<div className="p-4">Loading user...</div>}>
          <UserButton />
        </Suspense>
      }
    >
      {/* children (là các page component bên trong /admin) sẽ được render bởi Server Component này
          và truyền vào Client Boundary */}
      {children}
    </AdminLayoutClientBoundary>
  );
}