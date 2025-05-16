import { Loader, UploadCloudIcon, X } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from './ui/button'
import Image from 'next/image'
import { Skeleton } from './ui/skeleton'
import { deleteObject, getDownloadURL, uploadBytes } from 'firebase/storage'
import { storageRef } from '@/lib/firebase'

type UploadInterface = {
    file: File | null
    downloadUrl: string,
    filename: string
    state: 'pending' | 'complete' | 'error'
}
interface InputProps {
    onFilesAdded?: (addedFiles: string[]) => Promise<void>
    onFileDelete?: (url: string) => void
    photos?: string[]
}

function ImageDropzone({
    onFilesAdded,
    onFileDelete,
    photos
}: InputProps) {

    const [imageStates, setImageStates] = useState<UploadInterface[]>([])
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // this is when someone passes up photos
    useEffect(() => {
        if (photos && photos?.length > 0) {
            const photo: UploadInterface[] = []

            photos?.map(p => (
                photo.push({
                    file: null,
                    downloadUrl: p,
                    state: 'complete',
                    filename: ''
                })
            ))

            setImageStates(photo)
        }
    }, [photos])

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setUploading(true)
        setError(null)

        const promises: Promise<UploadInterface>[] = []

        try {

            const addedFiles = acceptedFiles.map<UploadInterface>((file) => ({
                file,
                downloadUrl: '',
                filename: `${Math.random().toString(36).slice(2,10)}_${Date.now()}.${file.name.split('.').pop()}`,
                state: 'pending'
            }))

            setImageStates(prevStates => [...prevStates, ...addedFiles])

            addedFiles.map(async file => {
                promises.push(

                    new Promise(async resolve => {
                        const fileRef = storageRef(file.filename)
                        
                        // wait for upload
                        await uploadBytes(fileRef, file.file as File)

                        const downloadUrl = await getDownloadURL(fileRef)

                        resolve({
                            file: file.file,
                            filename: file.filename,
                            state: file.state,
                            downloadUrl: downloadUrl
                        })
                    })
                )
            })

            //wait for promises to finish
            const result = await Promise.all(promises)
            const urls: string[] = []

            result.map(f => {
                urls.push(f.downloadUrl)

                setImageStates(imageStates => {
                    const newFileStates = structuredClone(imageStates)
                    const imageState = newFileStates.find(image => image.filename === f.filename)

                    if(imageState) {
                        imageState.downloadUrl = f.downloadUrl
                        imageState.state = 'complete'
                    }

                    return newFileStates
                })
            })

            await onFilesAdded?.(urls)

        } catch(error) {
            console.log(error)
            if (error instanceof Error) {
                setError(error.message)
            }
        } finally {
            setUploading(false)
        }
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [] },
        onDrop
    })

    const _handleDelete = async (photourl: string) => {

        // delete from firebase
        const ref = storageRef(photourl)
        await deleteObject(ref)
        
        // update local state
        const newState = imageStates.filter(state => state.downloadUrl !== photourl)
        setImageStates(newState)

        onFileDelete?.(photourl)
    }

    return (
        <>
            <div className='grid gap-2 grid-cols[repeat(1,1fr) sm:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(3,1fr)]'>
                <div {...getRootProps()}
                    className='text-center p-2 cursor-pointer border-2 border-dashed border-slate-200'>
                    <input {...getInputProps()} />
                    <div className='flex flex-col items-center justify-center text-xs text-gray=400'>
                        <UploadCloudIcon className='mb-4 w-8 h-8' />
                        <div className='text-gray-400'>drag &amp; drop to upload</div>
                        <div className="mt-2">
                            <Button disabled={uploading} type='button' variant='ghost'>Select</Button>
                        </div>
                    </div>
                </div>

                {
                    imageStates.map((image, index) => (
                        <div key={index} className='border-0 p-0 w-full relative shadow-md bg-slate-200 rounded
                aspect-square h-full'>
                            {
                                image.state === 'complete' ?
                                    <Image fill
                                        src={image.downloadUrl}
                                        alt={`photo ${index + 1}`}
                                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                        className='h-full w-full rounded-md object-cover' /> :
                                    <Skeleton className='h-full w-full' />
                            }
                            {/* loader */}
                            {
                                uploading && image.state === 'pending' &&
                                <div className='absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-md
                        bg-black bg-opacity-65'>
                                    <Loader />
                                </div>
                            }

                            {/* delete button */}
                            <div className="group absolute right-0 top-0"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    _handleDelete(image.downloadUrl)
                                }}
                            >
                                <div className="flex h-4 w-4 -translate-x-2 translate-y-2 cursor-pointer items-center justify-center">
                                    <X width={16} height={16} className='bg-red-500 text-white rounded-lg' />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* error */}
            {error && <p className='text-red-500 font-bold'>{error}</p>}
        </>
    )
}

export default ImageDropzone