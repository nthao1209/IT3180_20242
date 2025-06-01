// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Giữ nguyên import này
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import MemberSidebar from "@/components/member-sidebar";
import ClientProviders from "@/components/ClientProviders";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider defaultOpen={false}>
          <MemberSidebar />
          <main className="w-full">{children}</main>
        </SidebarProvider>
       
        <Toaster />
      </body>
    </html>
  );
}
