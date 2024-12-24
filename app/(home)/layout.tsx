import Footer from '@/components/footer'
import Header from '@/components/header'
import Navbar from '@/components/navbar'
import React from 'react'

function HomeLayout({ children }: {
    children: React.ReactNode
}) {
  return (
    <div>
        <Header />
        <Navbar />
        {children}
        <Footer />
    </div>
  )
}

export default HomeLayout