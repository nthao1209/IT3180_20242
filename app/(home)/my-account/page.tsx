import { auth, signIn } from '@/auth'
import BorrowingHistory from '@/components/borrowing-history'
import Checkout from '@/components/checkout'
import Fines from '@/components/fines'
import OnHold from '@/components/on-hold'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

async function AccountPage() {

    const session = await auth()

    if (!session) signIn()

    return (
        
            <Tabs defaultValue='checked-out' className='flex flex-col w-full'>
                <TabsList>
                    <TabsTrigger value='checked-out'>Checked out</TabsTrigger>
                    <TabsTrigger value='on-hold'>On hold</TabsTrigger>
                    <TabsTrigger value='fines'>Fines</TabsTrigger>
                    <TabsTrigger value='borrowing-history'>Borrowing history</TabsTrigger>
                </TabsList>
                <TabsContent value='checked-out'>
                    <Checkout />
                </TabsContent>
                <TabsContent value='on-hold'>
                    <OnHold />
                </TabsContent>
                <TabsContent value='fines'>
                    <Fines />
                </TabsContent>
                <TabsContent value='borrowing-history'>
                    <BorrowingHistory />
                </TabsContent>
            </Tabs>


    )
}

export default AccountPage