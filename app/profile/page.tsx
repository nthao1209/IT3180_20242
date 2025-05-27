import { auth, signIn } from '@/auth'
import BackButton from '@/components/back-button'
import SignOutButton from '@/components/signout-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <p>Hello, <span className='font-bold capitalize'>{session?.user.name}</span></p>
            {
                session?.user.profile_status === 'pending' && 
                <p className='border border-red-300 rounded-md p-2 bg-red-100'>You must update your password and re-login</p>
            }
            {
                !session?.user.is_active 
                && <p className='border border-red-300 rounded-md p-2 bg-red-100'>Your account has been deactivated</p>
            }
            <div>
                <Label>Name</Label>
                <Input readOnly type='text' defaultValue={session?.user.name as string} />
            </div>

            <div>
                <Label>Email</Label>
                <Input readOnly type='text' defaultValue={session?.user.email as string} />
            </div>

            {
                session?.user.role === 'member' &&
                <div>
                    <Label>Library card no</Label>
                    <Input readOnly type='text' defaultValue={user_details?.library_card_no as string} />
                </div>
            }

            {
               session?.user.role === 'staff' &&
                <ProfileForm  />
            }
            <div className='pt-2'>
            <SignOutButton styles='w-full border'/>
            </div>
            
        </div>
    )
}

export default ProfilePage