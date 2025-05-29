import { Book } from '@/app/(author)/author/(cataloge)/columns'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { z } from 'zod'
import { usePathname } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown, Loader } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command'
import { addBook, addPhoto, deletePhoto, getCategories, updateBook, requestUpdateBook, requestAddBook } from '@/actions/actions'
import { toast } from 'sonner'
import ImageDropzone from './image-dropzone'
import FileDropzone from './file-dropzone'
import { storageRef } from '@/lib/firebase'

type props = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    book?: Book
}

const formSchema = z.object({
    id: z.number().default(-1),
    name: z.string().min(1),
    isbn: z.string().min(10).max(13),
    price: z.number().default(1),
    file_path: z.string().default(''),
    published_date: z.coerce
        .number({ invalid_type_error: "must be a number" })
        .positive({ message: 'Value must be positive' })
        .finite({ message: "Must be a valid number" }),
    category: z.array(z.number()).min(1, {
        message: 'A book must have a category'
    }),
    photos: z.array(z.string()).default([])
})

type FormValues = z.infer<typeof formSchema>

function AddBookDialog({ open, setOpen, book }: props) {
    const [categories, setCategories] =
        useState<{ category_id: number, category_name: string }[]>([])
    const [processing, setProcessing] = useState(false)
    const path = usePathname()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: -1,
            name: "",
            isbn: '',
            price: 1,
            category: [],
            photos: [],
            file_path: '',
            published_date: new Date().getFullYear()
        }
    })

    useEffect(() => {

        (async () => {
            const cats = await getCategories(0, -1)
            setCategories(cats.data)
        }
        )()
    }, [])


    useEffect(() => {
        if (book) {
            form.setValue('id', book.book_id)
            form.setValue('name', book.name)
            form.setValue('isbn', book.isbn)
            form.setValue('published_date', book.published_date)
            form.setValue('category', book.book_category_links?.map(c => c.category_id) as number[])
            form.setValue('file_path', book.file_path)
            form.setValue('photos', book.book_photos?.map(p => p.url) || [])
            form.setValue('price', book.price)
        }
    }, [book, form])

    const handleItemSelect = (item: number) => {
        const newValue = form.getValues('category').slice()
        const itemIndex = newValue.indexOf(item)

        if (itemIndex === -1) {
            newValue.push(item)
        } else {
            newValue.splice(itemIndex, 1)
        }

        form.setValue('category', newValue)
    }

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setProcessing(true)
            let message = 'Book added'

            if (book) {
                await requestUpdateBook({...values, path})
                message = 'book updated'
                setOpen(false)
            } else {
                await addBook({...values, path})
                await requestAddBook({ ...values, path })
           
            }

            toast.success(message)
            form.reset()
        } catch (error) {
            console.error('Error submitting form:', error)
            toast.error('Failed to save book. Please check all required fields.')
        } finally {
            setProcessing(false)
        }
    }
    const handlePhotoAdd = async (filesToUpload: string[]) => {

        if (book) {
            const newPhoto = await addPhoto('book', book.book_id, filesToUpload[0], path)

            if (newPhoto) {
                book.book_photos?.push(newPhoto)
            }
        }
        const existingPhotos = form.getValues('photos')
        form.setValue('photos', [...existingPhotos, ...filesToUpload])
    }

    const handlePhotoDelete = async (url: string) => {

        if (book) {
            const photoToDelete = book.book_photos?.filter(bp => bp.url === url)
            if (photoToDelete && photoToDelete.length > 0) {
                await deletePhoto('book', photoToDelete[0].photo_id, path)
            }
        }
        const updatedPhotos = form.getValues('photos').filter(p => p !== url) ?? []
        form.setValue('photos', updatedPhotos)
    }

    const handleFileAdd = async (downloadUrl: string) => {
        form.setValue('file_path', downloadUrl);
        console.log('Data file uploaded:', downloadUrl);
    };

    const handleFileDelete = async (urlToDelete: string) => {
        if (urlToDelete) {
            try {
                const ref = storageRef(urlToDelete);
                form.setValue('file_path', "");
            } catch (error) {
                console.error('Error deleting data file:', error);
            }
        } else {
            form.setValue('file_path', "");
        }
    };



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add book</DialogTitle>
                    <DialogDescription></DialogDescription>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Book name</FormLabel>
                                        <FormControl>
                                            <Input placeholder='book name' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='isbn'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ISBN</FormLabel>
                                        <FormControl>
                                            <Input placeholder='ISBN' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                           
                             <FormField
                                control={form.control}
                                name="file_path"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Data File </FormLabel>
                                        <FormControl>
                                            <FileDropzone
                                                initialFile={field.value}
                                                onFileAdded={handleFileAdd}
                                                onFileDelete={handleFileDelete}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> 
                         {/* <FormField
                                control={form.control}
                                name={name}
                
                                render={({ field }) => (
                                    <FileDropzone
                                        onFileAdded={handleFileAdd}
                                        onFileDelete={handleFileDelete}
                                        initialFile={field.value}
                                    />
                                )}
                            />  */}
                            <FormField
                                control={form.control}
                                name='price'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="1$" 
                                                type="number"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='published_date'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Publish year</FormLabel>
                                        <FormControl>
                                            <Input placeholder="2024" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='category'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col'>
                                        <FormLabel>Category</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn("justify-between",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {
                                                            field.value.length > 0 ?
                                                                field.value
                                                                    .map(val =>
                                                                        categories.find(c => c.category_id === val)?.category_name)
                                                                    .join(',') : "Select a category"
                                                        }
                                                        <ChevronsUpDown className="opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[300px] p-0">
                                                <Command>
                                                    <CommandInput
                                                        placeholder="Search category..."
                                                        className="h-9"
                                                    />
                                                    <CommandList>
                                                        <CommandEmpty>No category found.</CommandEmpty>
                                                        <CommandGroup>
                                                            {categories.map((category) => (
                                                                <CommandItem
                                                                    value={category.category_name}
                                                                    key={category.category_id}
                                                                    onSelect={() => handleItemSelect(category.category_id)}>
                                                                    {category.category_name}
                                                                    <Check
                                                                        className={cn(
                                                                            "ml-auto",
                                                                            field.value.includes(category.category_id)
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            If a book belongs to multiple categories please select them.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name='photos'
                                render={({ field }) => (
                                    <ImageDropzone
                                        photos={field.value}
                                        onFilesAdded={handlePhotoAdd}
                                         onFileDelete={handlePhotoDelete}
                                    //    onFileDelete={(url) => handleFileDelete(url, '')}
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

export default AddBookDialog