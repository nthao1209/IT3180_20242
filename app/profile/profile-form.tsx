'use client'

import { State, updateProfile } from '@/actions/actions'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import React, { useActionState, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const passwordFormSchema = z.object({
    old_password: z.string(),
    new_password: z.string().min(8)
})

function ProfileForm() {

    const initialState: State = { message: null }
    const [state, formAction] = useActionState(updateProfile, initialState)
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<z.infer<typeof passwordFormSchema>>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: {
            old_password: '',
            new_password: ''
        }
    })
    return (
        <>
            <Form {...form}>
                <form action={formAction} className='space-y-2'>
                    <FormField
                        control={form.control}
                        name='old_password'
                        render={({ field }) => (
                            <FormItem className='relative'>
                                <FormLabel>Old password</FormLabel>
                                <FormControl>
                                    <Input type={showPassword ? 'text' : 'password'}
                                        id='old_password'
                                        placeholder='Old password' {...field} />
                                </FormControl>
                                <Button
                                    type='button'
                                    variant='ghost'
                                    size='icon'
                                    className='absolute right-2 top-1/2 -translate-y-1/3'
                                    onClick={() => setShowPassword(prev => !prev)}
                                >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </Button>
                            </FormItem>

                        )}
                    />
                    <FormField
                        control={form.control}
                        name='new_password'
                        render={({ field }) => (
                            <FormItem className='relative'>
                                <FormLabel>New password</FormLabel>
                                <FormControl>
                                    <Input type={showPassword ? 'text' : 'password'}
                                        id='new_password'
                                        placeholder='New password' {...field} />
                                </FormControl>
                                <Button
                                    type='button'
                                    variant='ghost'
                                    size='icon'
                                    className='absolute right-2 top-1/2 -translate-y-1/3'
                                    onClick={() => setShowPassword(prev => !prev)}
                                >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </Button>
                            </FormItem>
                        )}
                    />

                    <p className='text-red-500'>{state.message}</p>
                    <Button type="submit" className="w-full">Update</Button>
                </form>
            </Form>
        </>
    )
}

export default ProfileForm