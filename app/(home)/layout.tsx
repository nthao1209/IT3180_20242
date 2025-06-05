// app/(home)/layout.tsx

import Footer from "@/components/footer";
import Header from "@/components/header";
import Navbar from "@/components/navbar";
import { CartProvider } from "@/contexts/cart-context";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import React from "react";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        <div className="flex flex-col min-h-full">
          <Header />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </CartProvider>
    </SessionProvider>
  );
}
