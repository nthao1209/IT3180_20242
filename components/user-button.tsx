import { auth } from '@/auth'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { ChevronDown, User2 } from 'lucide-react'
import Link from 'next/link'
import SignInButton from './signin-button'
import SignOutButton from './signout-button'
// Bỏ SidebarMenuButton và SidebarProvider nếu không dùng trong component này
// import { SidebarMenuButton, SidebarProvider } from './ui/sidebar'

async function UserButton() {
    const session = await auth()
    const user = session?.user;

    // Nội dung menu cho người dùng chưa đăng nhập (guest)
    const guestMenu = (
        <>
            <DropdownMenuItem asChild>
                <Link href={'/register'} className='w-full justify-start p-2'>Register now</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className='p-0'> {/* Loại bỏ padding mặc định của item để button chiếm toàn bộ */}
                <SignInButton styles='w-full justify-start p-2' />
            </DropdownMenuItem>
        </>
    );

    // Nội dung menu cho admin
    const adminMenu = (
        <>
            <DropdownMenuItem asChild>
                <Link href={'/admin'} className='w-full justify-start p-2'>Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className='p-0'>
                <SignOutButton styles='w-full justify-start p-2' />
            </DropdownMenuItem>
        </>
    );

    // Nội dung menu cho author
    const authorMenu = (
        <>
            <DropdownMenuItem asChild>
                <Link href={'/author'} className='w-full justify-start p-2'>Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href='/my-account' className='w-full justify-start p-2'>My account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href='/profile' className='w-full justify-start p-2'>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className='p-0'>
                <SignOutButton styles='w-full justify-start p-2' />
            </DropdownMenuItem>
        </>
    );
    
    // Nội dung menu cho người dùng đã đăng nhập (vai trò khác hoặc không có vai trò cụ thể)
    const loggedInUserMenu = (
        <>
            <DropdownMenuItem asChild>
                <Link href='/my-account' className='w-full justify-start p-2'>My account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href='/profile' className='w-full justify-start p-2'>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className='p-0'>
                <SignOutButton styles='w-full justify-start p-2' />
            </DropdownMenuItem>
        </>
    );

    let menuContent;
    if (!user) {
        menuContent = guestMenu;
    } else if (user.role === 'admin') {
        menuContent = adminMenu;
    } else if (user.role === 'author') {
        menuContent = authorMenu;
    } else {
        // Các vai trò khác hoặc người dùng không có vai trò cụ thể nhưng đã đăng nhập
        menuContent = loggedInUserMenu;
    }

    return (
        <DropdownMenu>
           <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors">
                <User2 className="text-gray-600 h-5 w-5" /> {/* Có thể set kích thước icon */}
                <span className="capitalize font-medium text-gray-800 text-sm">
                    {/* Hiển thị username nếu có, nếu không thì phần đầu của name, cuối cùng là 'Guest' */}
                    {user?.username || user?.name?.split(' ')[0] || 'Guest'}
                </span>
                <ChevronDown className="text-gray-500 h-4 w-4" />
            </button>
        </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={5} className='w-[180px] bg-white shadow-lg rounded-md p-1'>
                {menuContent}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton