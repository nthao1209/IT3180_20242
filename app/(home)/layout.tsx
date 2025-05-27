"use client";

import Footer from '@/components/footer'
import Header from '@/components/header'
import Navbar from '@/components/navbar'
import React from 'react'

export default function HomeLayout({ children }: {
    children: React.ReactNode
}) {
  return (
    <>
        <Header />
        <Navbar />
        {children}
        <Footer />
    </>
  )
}

