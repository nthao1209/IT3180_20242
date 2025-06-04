// import { auth } from '@/auth'
// import { prisma } from '@/lib/prisma'
// import { MapPin } from 'lucide-react'

// async function LocationsPage() {
//   const session = await auth()
  
//   if (!session?.user) {
//     return (
//       <div className="container mx-auto p-8 text-center">
//         <h1 className="text-2xl font-bold mb-4">Locations</h1>
//         <p className="text-gray-600">Please sign in to view library locations.</p>
//       </div>
//     )
//   }

//   const locations = await prisma.locations.findMany({
//     orderBy: {
//       location_name: 'asc'
//     }
//   })

//   return (
//     <div className="container mx-auto p-4 md:p-8 min-h-screen">
//       <div className="flex items-center gap-2 mb-6">
//         <MapPin className="h-8 w-8 text-blue-500" />
//         <h1 className="text-3xl font-bold text-gray-800">Library Locations</h1>
//       </div>

//       {locations.length === 0 ? (
//         <p className="text-center text-gray-500">No locations found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {locations.map((location) => (
//             <div key={location.location_id} className="border rounded-lg p-6 shadow-sm">
//               <h2 className="text-xl font-semibold mb-2">{location.location_name}</h2>
//               <p className="text-gray-600 mb-2">{location.address}</p>
//               <p className="text-gray-600 mb-2">{location.city}, {location.state} {location.zip_code}</p>
//               <p className="text-gray-600">{location.phone}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default LocationsPage