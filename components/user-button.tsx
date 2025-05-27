// components/user-button.tsx
"use client"; // ĐÁNH DẤU LÀ CLIENT COMPONENT

import React from 'react';
import { useSession } from 'next-auth/react'; // SỬ DỤNG useSession
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { ChevronUp, User2 } from 'lucide-react';
import Link from 'next/link';
import SignInButton from './signin-button';
import SignOutButton from './signout-button';
import { SidebarMenuButton } from './ui/sidebar'; // Giả sử đây là một Button component
import { Skeleton } from './ui/skeleton'; // Thêm Skeleton cho trạng thái loading




function UserButton() {
    const { data: session, status } = useSession(); // Lấy session và status

    if (status === "loading") {
        // Hiển thị trạng thái loading khi session đang được kiểm tra
        return (
            <SidebarMenuButton disabled>
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-16 ml-2" />
                <ChevronUp className='ml-auto text-muted-foreground'/>
            </SidebarMenuButton>
        );
    }

    if (!session || !session.user) {
        // Người dùng chưa đăng nhập, chỉ hiển thị nút Sign In
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                        <User2 />
                        <p>Account</p>
                        <ChevronUp className='ml-auto'/>
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side='top' className='w-[150px]'>
                    <DropdownMenuItem>
                        <SignInButton styles='pl-2 w-full justify-start'/>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href='/' className='p-2 w-full block'>Home</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    // Người dùng đã đăng nhập
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                    <User2 />
                    <p className='capitalize truncate'>
                        {session.user.name?.split(' ')[0] || session.user.email}
                    </p>
                    <ChevronUp className='ml-auto'/>
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side='top' className='w-[150px]'>
                {session.user.role === 'staff' && // Giả sử role 'staff' tương ứng với admin
                    <DropdownMenuItem>
                        <Link href={'/admin'} className='p-2 w-full block'>Dashboard</Link>
                    </DropdownMenuItem>
                }
                {/* 
                  Bạn có thể không cần phân biệt role 'member' ở đây nếu 'my-account' và 'profile'
                  dành cho tất cả người dùng đã đăng nhập.
                */}
                <DropdownMenuItem>
                    <Link href={'/my-account'} className='p-2 w-full block'>My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href='/profile' className='p-2 w-full block'>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href='/' className='p-2 w-full block'>Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <SignOutButton styles='pl-2 w-full justify-start' />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserButton;