import { auth, signIn } from '@/auth'
// import OnHold from '@/components/on-hold'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import PurchaseHistory from '@/components/purchase-history'
import MyLibrary from '@/components/my-library'
import RecentlyReviewed from '@/components/recently-reviewed'
import { prisma } from '@/lib/prisma'
import BookCard from '@/components/bookcard'
import PendingPurchases from '@/components/pending-purchases'
import { getPendingPurchases } from '@/actions/actions'



import { useCart } from '@/contexts/cart-context'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CartPage from '../cart/page'



async function AccountPage() {
    const session = await auth()

    if (!session) signIn()

    const favorites = await prisma.liked_books.findMany({
        where: {
            user_id: parseInt(session?.user?.id || '0')
        },
        include: {
            book: {
                include: {
                    book_photos: true,
                    users: {
                        select: {
                            user_id: true,
                            name: true
                        }
                    }
                }
            }
        }
    })

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">My Account</h1>
            <Tabs defaultValue='my-library' className='flex flex-col w-full'>
                <TabsList>
                    <TabsTrigger value='my-library'>My Library</TabsTrigger>
                    {/* <TabsTrigger value='purchase-history'>Purchase History</TabsTrigger> */}
                    {/* <TabsTrigger value='recently-reviewed'>Recently Reviewed</TabsTrigger> */}
                    <TabsTrigger value='liked-books'>Liked Books</TabsTrigger>
                    <TabsTrigger value='cart'>Cart</TabsTrigger>

                    <TabsTrigger value='pending-purchases'>Pending Purchases</TabsTrigger>

                </TabsList>

                <TabsContent value='my-library'>
                    <MyLibrary />
                </TabsContent>
                <TabsContent value='pending-purchases'>
  <PendingPurchases />
</TabsContent>
               {/* <TabsContent value='purchase-history'>
                    <PurchaseHistory />
                </TabsContent> */}
                <TabsContent value='recently-reviewed'>
                    <RecentlyReviewed />
                </TabsContent>
                <TabsContent value='liked-books'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {favorites.map((favorite) => (
                            <BookCard 
                                key={favorite.book_id} 
                                book={{
                                    ...favorite.book,
                                    author: favorite.book.users
                                }} 
                            />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value='cart'>
                    <CartPage/>
                </TabsContent>
            </Tabs>
        </div>
    )
}




export default AccountPage
