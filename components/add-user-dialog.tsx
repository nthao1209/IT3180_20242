import { User } from '@/app/(admin)/admin/users/columns'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useToast } from '@/hooks/use-toast'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { cn } from '@/lib/utils'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'
import { addUser, updateUser } from '@/actions/actions'

type Props = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    user?: User
}

const formSchema = z.object({
    user_id: z.number().default(-1),
    name: z.string().min(2, {
        message: "Member name must be valid.",
    }),
    email: z.string().min(2, {
        message: "Email must be valid.",
    }),
    library_card_no: z.string(),
    role: z.string(),
    is_active: z.boolean().default(true),
})

function AddUserDialog({ open, setOpen, user }: Props) {
    const { toast } = useToast()
    const [processing, setProcessing] = useState(false)
    const path = usePathname()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: '',
            library_card_no: '',
            role: 'member',
            is_active: true
        }
    })

    useEffect(() => {
        if (user) {
            form.setValue('user_id', user.user_id)
            form.setValue('name',user.name)
            form.setValue('email',user.email)
            form.setValue('role',user.role)
            form.setValue('library_card_no',user.library_card_no)
            form.setValue('is_active',user.is_active as boolean)
        }
    },[user, form])

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        
        let message = 'User added'
        setProcessing(true)
        if (user) {
            // update
            await updateUser(values.user_id,values.name, values.email, values.library_card_no, values.role,values.is_active, path)
            message = 'User updated'
        } else {
            await addUser(values.name, values.email, values.library_card_no, values.role, values.is_active, path)
        }

        toast({
            description: message
        })
        setProcessing(false)
        form.reset()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>List user</DialogTitle>
                    <DialogDescription></DialogDescription>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-1'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder='first last' {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder='email@domain.com' {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='library_card_no'
                                render={({ field }) => (
                                    <FormItem className='grid'>
                                        <FormLabel>Library card no</FormLabel>
                                        <FormControl>
                                            <Input placeholder='e.g. 4545...' {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter the 10 digit library card no.
                                            
                                         </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='role'
                                render={({ field }) => (
                                    <FormItem className='grid'>
                                        <FormLabel>Role</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Select a role' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value='member'>Member</SelectItem>
                                                <SelectItem value='staff'>Staff</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='is_active'
                                render={({ field }) => (
                                    <FormItem className='flex items-center space-x-3 space-y-0'>
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <FormLabel className={cn(`${field.value ? 'text-green-500' : 'text-red-500'}`, 'font-semibold text-md')}>{field.value ? 'Active' : 'Inactive'}</FormLabel>
                                    </FormItem>
                                )}
                            />

                            <div className='flex flex-col w-full space-y-2'>
                                {processing ? <div className='flex'><Loader className='mr-2' />Saving...</div> :
                                    <Button type='submit'>Save</Button>
                                }
                            </div>
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AddUserDialog