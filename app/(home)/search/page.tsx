import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type ResultType = {
    book_id: number
    author: string
    name: string
    book_category_links: {
        category_id: number
        book_categories: {
            category_name: string
        }
    }[],
    book_photos: { url: string }[]
}

async function SearchPage({
    searchParams
}: { searchParams: { query: string, search_by: string } }
) {
    const params = await searchParams
    const { query, search_by } = params
    let results: ResultType[] = []

    if (search_by === 'title') {
        results = await prisma.books.findMany({
            where: {
                OR: [
                    { name: { contains: query } },
                    { name: { startsWith: query } },
                    { name: { endsWith: query } }
                ]
            },
            include: {
                book_photos: {
                    select: { url: true }
                },
                book_category_links: {
                    include: {
                        book_categories: {
                            select: { category_name: true }
                        }
                    }
                }
            }
        })
    } if (search_by === 'category') {
        results = await prisma.books.findMany({
            where: {
                book_category_links: {
                    some: {
                        book_categories: {
                            category_name: { contains: query }
                        }
                    }
                }
            },
            include: {
                book_photos: {
                    select: { url: true }
                },
                book_category_links: {
                    include: {
                        book_categories: {
                            select: { category_name: true }
                        }
                    }
                }
            }
        })
    }

    return (
        <>
            <div className="max-w-7xl mx-auto flex-col p-4 pt-16 space-y-8 sm:space-x-4">
                <h1 className='text-2xl sm:text-4xl'>Search results</h1>
                {
                    results && results.length > 0 && (
                        results.map(result => (
                            <div key={result.book_id} className='flex flex-col lg:flex-row sm:space-x-4'>
                                {
                                    result.book_photos &&
                                    <Link href={`/book/${result.book_id}`} className='cursor-pointer'>
                                        <Image
                                            width={100}
                                            height={0}
                                            src={result.book_photos[0].url}
                                            alt='book cover'
                                            className='object-cover h-auto rounded-l-md'
                                        />
                                    </Link>
                                }

                                <div className="flex flex-col">
                                    <h1 className='text-2xl font-bold text-gray-800 mb-1 capitalize'>{result.name}</h1>
                                    <p className='text-blue-500 capitalize'>{result.author}</p>
                                    <div className="flex space-x-2">
                                        {
                                            result.book_category_links && result.book_category_links.map(bcl => (
                                                <div key={bcl.category_id} className='capitalize px-4 py-2 text-gray-500 border border-gray-300 rounded-md'>
                                                    {bcl.book_categories.category_name}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                }
                {
                    results && results.length === 0 && <h2 className='text-2xl'>No results found</h2>
                }
            </div>
        </>
    )
}

export default SearchPage