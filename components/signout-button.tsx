// components/signout-button.tsx
"use client"; // Đánh dấu đây là Client Component

import React from 'react';
import { Button } from './ui/button'; // Giả sử bạn có Button component
import { signOut } from 'next-auth/react'; // Import signOut từ next-auth/react
import { cn } from '@/lib/utils'; // Giả sử bạn có hàm cn

// Giả sử styles là một prop hoặc được định nghĩa ở đâu đó
interface SignOutButtonProps {
  styles?: string;
  // Thêm các props khác nếu cần, ví dụ: callbackUrl
  callbackUrl?: string;
}

function SignOutButton({ styles, callbackUrl }: SignOutButtonProps) {
  const handleSignOut = async () => {
    // Gọi signOut, bạn có thể truyền callbackUrl để chuyển hướng sau khi đăng xuất
    await signOut({ callbackUrl: callbackUrl || '/' }); // Mặc định chuyển về trang chủ
  };

  return (
    <Button onClick={handleSignOut} variant='ghost' className={cn(styles)}>
      Sign out
    </Button>
  );
}

export default SignOutButton;