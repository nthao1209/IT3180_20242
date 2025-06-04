// 'use client'

// import React from 'react'
// import { getReservationRankForBook } from '@prisma/client/sql'
// import { auth } from '@/auth'
// import { prisma } from '@/lib/prisma'
// import HoldButton from './hold-button'

// async function OnHold() {
//   const session = await auth()
//   if (!session) return null

//   const results = await prisma.reservations.findMany({
//     where: {
//       user_id: parseInt(session.user.id)
//     },
//     include: {
//       books: {
//         select: {
//           name: true,
//           book_id: true,
//           cover_image: true,
//           users: {
//             select: {
//               name: true
//             }
//           }
//         }
//       }
//     }
//   })

//   return (
//     <div className="space-y-4">
//       {results.map(result => {
//         const book_id = result.book_id
//         const rank = await prisma.$queryRawTyped(getReservationRankForBook(book_id, session?.user.user_id as number))
//         return (
//           <div key={result.reservation_id} className="flex items-center justify-between p-4 border rounded-lg">
//             <div className="flex items-center space-x-4">
//               {result.books.cover_image && (
//                 <img src={result.books.cover_image} alt={result.books.name} className="w-16 h-24 object-cover" />
//               )}
//               <div>
//                 <h3 className="font-semibold">{result.books.name}</h3>
//                 <p className="text-sm text-gray-500">by {result.books.users.name}</p>
//                 <p className="text-sm text-gray-500">Your position in queue: {rank[0].queue_number}</p>
//               </div>
//             </div>
//             <HoldButton book_id={result.book_id} />
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// export default OnHold
