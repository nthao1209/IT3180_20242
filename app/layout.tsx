// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Giữ nguyên import này
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import MemberSidebar from "@/components/member-sidebar";
import ClientProviders from "@/components/ClientProviders";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { CartProvider } from '@/contexts/cart-context'

// KHỞI TẠO FONT VỚI CSS VARIABLE
const geistSans = Geist({
  subsets: ["latin"],
  display: 'swap', // Tùy chọn: cải thiện FOUT
  variable: "--font-geist-sans", // Chỉ định tên CSS variable
  // weight: ['400', '700'], // Chỉ định các weight bạn cần nếu font hỗ trợ
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-geist-mono", // Chỉ định tên CSS variable
  // weight: ['400'], // Chỉ định weight
});

export const metadata: Metadata = {
  title: "The Library App",
  description: "A library management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Áp dụng các class variable của font vào thẻ <html>
    // Next.js sẽ tự động tạo ra các class này khi bạn cung cấp option `variable`
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body
        // Không cần className font ở đây nữa nếu đã áp dụng cho <html>
        // Chỉ cần các class tiện ích khác như antialiased
        className={`antialiased`}
        suppressHydrationWarning
      >
        <CartProvider>
          <ClientProviders>
            <SidebarProvider defaultOpen={false}>
              <MemberSidebar />
              <SidebarInset>
                {children}
              </SidebarInset>
              <Toaster />
            </SidebarProvider>
          </ClientProviders>
        </CartProvider>
      </body>
    </html>
  );
}
