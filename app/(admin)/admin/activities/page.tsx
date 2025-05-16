// import AddActivityButton from '@/components/add-activity-button'
// import { prisma } from '@/lib/prisma'
// import React from 'react'
// import ActivitiesTable from './activities-table'

// async function ActivitiesPage({
//   searchParams
// }: { searchParams: { page: string, limit: string } }) {

//   const params = await searchParams
//   const offset = parseInt(params.page || '10')
//   const take = parseInt(params.limit || '10')

//   const [activities, total] = await prisma.$transaction([
//     prisma.activities.findMany({ skip: offset, take: take }),
//     prisma.activities.count()
//   ])

//   return (
//     <div className='flex flex-col space-y-4'>
//       <AddActivityButton />
//       <ActivitiesTable data={{data: activities, total: total}} />
//     </div>
//   )
// }

// export default ActivitiesPage
