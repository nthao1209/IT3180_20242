// app/(home)/layout.tsx
import Footer from '@/components/footer';
import Header from '@/components/header';
import Navbar from '@/components/navbar';
import React from 'react';

export default function HomeLayout({ children }: {
    children: React.ReactNode
}) {
  return (
       <div className="flex flex-col min-h-full"> {/* min-h-full để cố gắng chiếm chiều cao của SidebarInset */}
        <Header/>
        <Navbar/>
        <main className="flex-grow"> {/* Cho phép main content của HomeLayout co giãn */}
            {children} {/* HomePage sẽ được render ở đây */}
        </main>
        <Footer/>
       </div>
  );
}
