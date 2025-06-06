// @/components/user-button.tsx
import { auth } from '@/auth'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from './ui/dropdown-menu'
import {
  ChevronDown,
  User2,
  LogIn,
  UserPlus,
  LogOut,
  Settings
} from 'lucide-react'
import Link from 'next/link'
import SignInButton from './signin-button'
import SignOutButton from './signout-button'

async function UserButton() {
  const session = await auth()
  const user = session?.user
  const commonIconClass = "mr-2 h-4 w-4 text-gray-500"

  // Menu cho khách chưa đăng nhập
  const guestMenu = (
    <>
      <DropdownMenuItem asChild>
        <Link
          href="/register"
          className="flex items-center w-full justify-start p-2 cursor-pointer hover:bg-gray-100 rounded-sm"
        >
          <UserPlus className={commonIconClass} />
          Register now
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem className="p-0 cursor-pointer hover:bg-gray-100 rounded-sm">
        <SignInButton styles="flex items-center w-full justify-start p-2">
          <LogIn className={commonIconClass} />
          Sign In
        </SignInButton>
      </DropdownMenuItem>
    </>
  )

  // Link Sign Out chung
  const signOutLink = (
    <DropdownMenuItem className="p-0 cursor-pointer hover:bg-red-50 rounded-sm">
      <SignOutButton styles="flex items-center w-full justify-start p-2 text-red-600">
        <LogOut className={`${commonIconClass} text-red-600`} />
        Sign Out
      </SignOutButton>
    </DropdownMenuItem>
  )

  // Menu cho người dùng đã đăng nhập (vai trò thông thường)
  const loggedInUserMenu = (
    <>
      <DropdownMenuItem asChild>
        <Link
          href="/my-account"
          className="flex items-center w-full justify-start p-2 cursor-pointer hover:bg-gray-100 rounded-sm"
        >
          <Settings className={commonIconClass} />
          My Account
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link
          href="/profile"
          className="flex items-center w-full justify-start p-2 cursor-pointer hover:bg-gray-100 rounded-sm"
        >
          <User2 className={commonIconClass} />
          Profile
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      {signOutLink}
    </>
  )

  // Menu riêng cho admin & author
  const staffMenu = (
    <>
      <DropdownMenuItem asChild>
        <Link
          href="/profile"
          className="flex items-center w-full justify-start p-2 cursor-pointer hover:bg-gray-100 rounded-sm"
        >
          <User2 className={commonIconClass} />
          Profile
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      {signOutLink}
    </>
  )

  // Xác định nội dung menu và tên hiển thị
  let menuContent = guestMenu
  let displayName = 'Guest'

  if (user) {
    displayName = user.username || user.name?.split(' ')[0] || 'User'
    if (user.role === 'admin' || user.role === 'author') {
      menuContent = staffMenu
    } else {
      menuContent = loggedInUserMenu
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <User2 className="text-gray-600 h-5 w-5" />
          <span className="capitalize font-medium text-gray-700 text-sm">
            {displayName}
          </span>
          <ChevronDown className="text-gray-500 h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-[200px] bg-white shadow-xl rounded-lg border border-gray-200 p-1"
      >
        {menuContent}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton