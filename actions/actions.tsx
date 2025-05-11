
////////////////////////////////////////////////////////////////////////////////
//              Books
////////////////////////////////////////////////////////////////////////////////

'use server'
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { use } from "react"
// import bcrypt from 'bcryptjs'
//import { auth, signIn, signOut } from "@/auth"
// import { addDays, addMonths, differenceInCalendarDays } from "date-fns"
// import { z } from "zod"
// import { formatAmountForStripe } from "@/lib/utils"
// import { redirect } from "next/navigation"
// import { headers } from "next/headers"


export async function addBook({
    name,
    isbn,
    category,
    path,
    author,
    price,
    file_path
}: {
    name: string
    isbn: string
    category: number[]
    path: string,
    author: string,
    price: number,
    file_path: string
}) {

    try {

        await prisma.$transaction(async t => {

            const book = await t.books.create({
                data: {
                    name: name,
                    isbn: isbn,
                    author: author,
                    price: price,
                    file_path: file_path
                }
            })

            if (category && category.length > 0) {
                const data = category.map(cat => ({
                    book_id: book.book_id,
                    category_id: cat
                }))

                await t.book_category_links.createMany({ data })
            }

            revalidatePath(path)
        })
        
    } catch(error) {
        throw error
    }
}

export async function updateBook({
    id,
    name,
    isbn,
    category,
    path,
    author,
    published_date,
    price,
    file_path
}: {
    id: number,
    name: string
    isbn: string
    category: number[]
    path: string,
    author: string,
    published_date: number,
    price: number,
    file_path: string
}) {

    try {

        await prisma.$transaction(async t => {

            const book = await t.books.update({
                where: {
                    book_id: id
                },
                data: {
                    name: name,
                    isbn: isbn,
                    author: author,
                    file_path: file_path,
                    price: price
                    // published_date: published_date
                }
            })

            await t.book_category_links.deleteMany({
                where: {
                    book_id: id
                }
            })

            if (category && category.length > 0) {
                const data = category.map(cat => ({
                    book_id: book.book_id,
                    category_id: cat
                }))

                await t.book_category_links.createMany({ data })
            }

            revalidatePath(path)
        })
        
    } catch(error) {
        throw error
    }
}

export async function deleteBook(book_id: number, path: string) {

    await prisma.$transaction(async t => 

        await t.books.delete({
            where: {
                book_id: book_id
            }
        })
    )

    revalidatePath(path)
}

// export async function placeHold(book_id: number, path: string) {
//     const session = await auth()
    
//     if (!session) {
//         throw new Error("You must be logged in")
//     }

//     await prisma.$transaction(t => (
//         t.reservations.create({
//             data: {
//                 book_id: +book_id,
//                 user_id: session?.user.user_id,
//                 reservation_date: new Date(),
//                 expiration_date: addDays(new Date(), 15)
//             }
//         })
//     ))

//     revalidatePath(path)
// }

// export async function cancelHold(id: number, path: string) {
//     await prisma.$transaction(t => (
//         t.reservations.delete({
//             where: {
//                 reservation_id: id
//             }
//         })
//     ))

//     revalidatePath(path)
// }

export async function addCategory(name: string, path: string) {

    try {

        const category = await prisma.$transaction([
            prisma.book_categories.create({
                data: {
                    category_name: name
                }
            })
        ])

        revalidatePath(path)
        return category

    } catch(error) {
        throw error
    }
}

export async function updateCategory(id: number, name: string, path: string) {

    if (!id) throw new Error("Missing id")
    try {

        await prisma.$transaction([
            prisma.book_categories.update({
                where: {
                    category_id: id
                },
                data: {
                    category_name: name
                }
            })
        ])

        revalidatePath(path)

    } catch(error) {
        throw error
    }
}

export async function deleteCategory(id: number, path: string) {

    try {

        await prisma.$transaction([
            prisma.book_categories.delete({
                where: {
                    category_id: id
                }
            })
        ])

        revalidatePath(path)

    } catch(error) {
        throw error
    }
}

export async function getCategories(offset: number, limit: number) {

    try {

        let categories
        let total
        
        if (limit === -1) {
            categories = await prisma.book_categories.findMany()
            total = categories.length
        } else {
            [categories, total] = await prisma.$transaction([
                prisma.book_categories.findMany({ skip: offset, take: limit}),
                prisma.book_categories.count()
            ])
        }

        return { data: categories, total: total}

    } catch(error) {
        throw error
    }
}