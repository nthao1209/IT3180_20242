'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import DateSelect from './date-select'
import { Button } from './ui/button'

const formSchema = z.object({
    from: z.date(),
    to: z.date()
})

function ActivityDateSelect() {
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {}
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const from = format(values.from, 'yyyy-MM-dd')
        const to = format(values.to, 'yyyy-MM-dd')

        router.replace(`/activities?from=${from}&to=${to}`)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col sm:flex-row sm:space-x-4 items-end justify-center sm:justify-end space-y-2'>
                <FormField 
                    control={form.control}
                    name='from'
                    render={ ({ field}) => (
                        <FormItem className='flex flex-col sm:w-[200px] w-full'>
                            <FormLabel>From date</FormLabel>
                            <FormControl>
                                <DateSelect field={field} disableDates={true} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField 
                    control={form.control}
                    name='to'
                    render={ ({ field}) => (
                        <FormItem className='flex flex-col sm:w-[200px] w-full'>
                            <FormLabel>To date</FormLabel>
                            <FormControl>
                                <DateSelect field={field} disableDates={true} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type='submit'>Search</Button>
            </form>
        </Form>
    )
}

export default ActivityDateSelect