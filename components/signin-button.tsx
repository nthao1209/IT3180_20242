// components/signin-button.tsx
"use client"; // Đánh dấu đây là Client Component vì sử dụng hook/event handler

import React from 'react';
import { Button } from './ui/button'; // Giả sử bạn có Button component
import { signIn } from 'next-auth/react'; // Import signIn từ next-auth/react
import { cn } from '@/lib/utils'; // Giả sử bạn có hàm cn

// Giả sử styles là một prop hoặc được định nghĩa ở đâu đó
interface SignInButtonProps {
  styles?: string;
  // Thêm các props khác nếu cần, ví dụ: callbackUrl, providerId
  providerId?: string; // Ví dụ: 'credentials', 'google', 'github'
  callbackUrl?: string;
}

export function SignInButton({ styles, providerId, callbackUrl }: SignInButtonProps) {
  const handleSignIn = () => {
    // Gọi signIn với provider cụ thể nếu muốn, hoặc để trống để hiển thị trang đăng nhập mặc định
    // Nếu bạn chỉ có Credentials provider, có thể không cần providerId
    signIn(providerId, { callbackUrl: callbackUrl || '/' });
  };

  return (
    <Button onClick={handleSignIn} variant='ghost' className={cn(styles)}>
      Sign in
    </Button>
  );
}

export default SignInButton;
