import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { Activity } from '@/app/(admin)/admin/activities/columns'
import { Textarea } from './ui/textarea'
import DateSelect from './date-select'
import TimeSelect from './time-select'
import ImageDropzone from './image-dropzone'
import { addActivity, updateActivity } from '@/actions/actions'
import { Loader } from 'lucide-react'

type Props = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    activity?: Activity
}

const formSchema = z.object({
    activity_id: z.number().default(-1),
    title: z.string().min(2, {
        message: 'Actiivty title must be entered'
    }).max(20),
    description: z.string().min(10).max(255),
    activity_date: z.date(),
    start_time: z.string(),
    end_time: z.string(),
    age_group: z.string(),
    capacity: z.coerce
        .number({ invalid_type_error: "must be a number" })
        .positive({ message: 'Value must be positive' })
        .finite({ message: "Must be a valid number" }),
    photos: z.array(z.string()).default([])
})

function AddActivityDialog({ setOpen, open, activity }: Props) {
    const { toast } = useToast()
    const [processing, setProcessing] = useState(false)
    const path = usePathname()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: '',
            age_group: '',
            capacity: 0,
            photos: []
        }
    })

    useEffect(() => {
        if (activity) {
            form.setValue('activity_id', activity.activity_id)
            form.setValue('title', activity.title)
            form.setValue('description', activity.description!)
            form.setValue('activity_date', activity.activity_date)
            form.setValue('start_time', activity.start_time)
            form.setValue('end_time', activity.end_time)
            form.setValue('age_group', activity.age_group!)
            form.setValue('capacity', activity.capacity!)
            form.setValue('photos', activity.activity_photos?.map(p => p.url) || [])
        }
    }, [activity, form])

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            let message = 'Activity has been saved'
            setProcessing(true)
            if (activity) {
                await updateActivity({...values, path })
                message = "activity updated"
                setOpen(false)
            } else {
                await addActivity({...values, path})
            }

            toast({
                description: message
            })
            form.reset()
            setProcessing(false)
        } catch (error) {
            console.log(error)
            toast({
                description: 'Failed to perform action',
            })
        }

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>List activity</DialogTitle>
                    <DialogDescription></DialogDescription>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-1'>
                            <FormField
                                control={form.control}
                                name='title'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder='activity title' {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='description'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                maxLength={200}
                                                placeholder='provide a description of the activity' {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='activity_date'
                                render={({ field }) => (
                                    <FormItem className='grid'>
                                        <FormLabel>Activity date</FormLabel>
                                        <FormControl>
                                            <DateSelect field={field} disableDates={true} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name='start_time'
                                    render={({ field }) => (
                                        <FormItem className='grid'>
                                            <FormLabel>Start time</FormLabel>
                                            <FormControl>
                                                <TimeSelect onChange={field.onChange} defaultValue={field.value} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='end_time'
                                    render={({ field }) => (
                                        <FormItem className='grid'>
                                            <FormLabel>End time</FormLabel>
                                            <FormControl>
                                                <TimeSelect
                                                    disableTime={form.getValues('start_time')}
                                                    onChange={field.onChange} defaultValue={field.value} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name='age_group'
                                    render={({ field }) => (
                                        <FormItem className='grid'>
                                            <FormLabel>Age group</FormLabel>
                                            <FormControl>
                                                <Input placeholder='12-17' {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='capacity'
                                    render={({ field }) => (
                                        <FormItem className='grid'>
                                            <FormLabel>Capacity</FormLabel>
                                            <FormControl>
                                                <Input placeholder='e.g. 10' {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name='photos'
                                render={({ field }) => (
                                    <ImageDropzone
                                        photos={field.value}
                                    />
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

export default AddActivityDialog