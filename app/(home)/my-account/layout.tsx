import { auth, signIn } from '@/auth'
import React from 'react'

async function MyAccountLayout({ children }: { children: React.ReactNode }) {

    const session = await auth()

    if (!session) await signIn()
        
    return (
        <div className="container mx-auto p-8 sm:max-w-6xl">
            {children}
        </div>
    )
}

export default MyAccountLayout