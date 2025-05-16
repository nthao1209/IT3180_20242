import { auth, signIn } from '@/auth'
import BackButton from '@/components/back-button'
import SignOutButton from '@/components/signout-button'
import { prisma } from '@/lib/prisma'
import React from 'react'
import ProfileForm from './profile-form'

async function ProfilePage() {
  const session = await auth()

  if (!session) {
    await signIn()
  }

  const user_details = await prisma.users.findUnique({
    where: {
      email: session?.user.email as string
    }
  })

  return (
    <div className='container mx-auto mt-32 max-w-md border border-slate-300 rounded-md shadow-md p-8 space-y-2' >
      <BackButton />
      <h1 className="text-2xl font-bold mb-4">Hồ sơ cá nhân</h1>

      {session?.user.role === 'member' && user_details && (
        <ProfileForm user={user_details} />
        )}

      <div className='pt-2'>
        <SignOutButton styles='w-full border' />
      </div>
    </div>
  )
}

export default ProfilePage
