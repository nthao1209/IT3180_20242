import { prisma } from '@/lib/prisma'
import React from 'react'
import FinesTable from './fines-table'

async function FinesPage({
  searchParams
}: { searchParams: { page: string, limit: string } }) {

  const params = await searchParams
  const offset = parseInt(params.page || '10')
  const take = parseInt(params.limit || '10')

  const [fines, total] = await prisma.$transaction([
    prisma.fines.findMany({ skip: offset, take: take }),
    prisma.fines.count()
  ])
  return (
    <div>
      <FinesTable data={{data: JSON.parse(JSON.stringify(fines)), total: total}} />
    </div>
  )
}

export default FinesPage