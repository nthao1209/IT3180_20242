import AddUserButton from '@/components/add-user-button'
import React from 'react'
import UsersTable from './users-table'
import { prisma } from '@/lib/prisma'

async function UsersPage({
  searchParams
}: { searchParams: { page: string, limit: string } }) {


  const params = await searchParams
  const offset = parseInt(params.page || '10')
  const take = parseInt(params.limit || '10')

  const [users, total] = await prisma.$transaction([
    prisma.users.findMany({ skip: offset, take: take }),
    prisma.users.count()
  ])

  return (
    <div className='flex flex-col space-y-4'>
      <AddUserButton />
      <UsersTable data={{ data: users, total: total }} />
    </div>
  )
}

export default UsersPage