'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import bcrypt from 'bcryptjs'
import { auth, signIn, signOut } from "@/auth"
import { addDays, addMonths, differenceInCalendarDays } from "date-fns"
import { z } from "zod"
import { stripe } from "@/lib/stripe"
import { formatAmountForStripe } from "@/lib/utils"
import { redirect } from "next/navigation"
import { headers } from "next/headers"


////////////////////////////////////////////////////////////////////////////////
//              Category
////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////
//              Books
////////////////////////////////////////////////////////////////////////////////
export async function addBook({
    name,
    isbn,
    no_of_copies,
    category,
    path,
    photos,
    publish_year,
    author
}: {
    name: string
    isbn: string
    no_of_copies: number,
    category: number[]
    path: string,
    photos: string[],
    publish_year: number,
    author: string
}) {

    try {

        await prisma.$transaction(async t => {

            const book = await t.books.create({
                data: {
                    name: name,
                    isbn: isbn,
                    no_of_copies: no_of_copies,
                    publish_year: publish_year,
                    author: author
                }
            })

            if (category && category.length > 0) {
                const data = category.map(cat => ({
                    book_id: book.book_id,
                    category_id: cat
                }))

                await t.book_category_links.createMany({ data })
            }

            // save photos
            if (photos && photos.length > 0) {
                const data = photos.map(photo => ({
                    book_id: book.book_id,
                    url: photo
                }))

                await t.book_photos.createMany({ data })
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
    no_of_copies,
    category,
    path,
    publish_year,
    author
}: {
    id: number,
    name: string
    isbn: string
    no_of_copies: number,
    category: number[]
    path: string,
    photos: string[],
    publish_year: number,
    author: string
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
                    no_of_copies: no_of_copies,
                    publish_year: publish_year,
                    author: author
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

export async function placeHold(book_id: number, path: string) {
    const session = await auth()
    
    if (!session) {
        throw new Error("You must be logged in")
    }

    await prisma.$transaction(t => (
        t.reservations.create({
            data: {
                book_id: +book_id,
                user_id: session?.user.user_id,
                reservation_date: new Date(),
                expiration_date: addDays(new Date(), 15)
            }
        })
    ))

    revalidatePath(path)
}

export async function cancelHold(id: number, path: string) {
    await prisma.$transaction(t => (
        t.reservations.delete({
            where: {
                reservation_id: id
            }
        })
    ))

    revalidatePath(path)
}

////////////////////////////////////////////////////////////////////////////////
//              Kiosk sim
////////////////////////////////////////////////////////////////////////////////
export async function checkoutBook(prevState: State, formData: FormData) {

    const library_card_no = formData.get('library_card_no') as string
    const isbn = formData.get('isbn')?.toString().replaceAll('-', '')

    const book = await prisma.books.findFirst({
        where: {
            isbn: isbn
        },
        select: {
            book_id: true,
            name: true
        }
    })

    const user = await prisma.users.findFirst({
        where: {
            library_card_no: library_card_no
        }
    })

    if (book && user ) {
        const date = new Date()
        await prisma.$transaction(async t => (

            await t.borrowings.create({
                data: {
                    book_id: book.book_id,
                    user_id: user.user_id,
                    borrow_date: date,
                    due_date: addDays(date, 15)
                }
            })
        ))

        return {
            message: `You have checked out ${book.name}`
        }
    }

    return {
        message: `Checkout failed. See a librarian`
    }
}

export async function checkinBook(prevState: State, formData: FormData) {
    const isbn = formData.get('isbn')?.toString().replaceAll('-', '')
    const book = await prisma.books.findFirst({
        where: {
            isbn: isbn
        },
        select: {
            book_id: true,
            name: true
        }
    })

    const borrowing = await prisma.borrowings.findFirst({
        where: {
            book_id: book?.book_id
        }
    })

    if (!borrowing) {
        return {
            message: 'Invalid transaction'
        }
    }
    
    const user_id = borrowing?.user_id
    const return_date = addMonths(new Date(), 1)
    const diffInDays = differenceInCalendarDays(return_date, borrowing?.due_date as Date)
    let message = ''

    await prisma.$transaction(async t => {

        await t.borrowings.update({
            where: {
                borrowing_id: borrowing?.borrowing_id
            },
            data: {
                return_date: return_date
            }
        })

        if (diffInDays > 0) {
            // $0.50 penalty
            const fineAmount = diffInDays * 0.50
            await t.fines.create({
                data: {
                    fine_date: return_date,
                    fine_amount: fineAmount,
                    user_id: user_id,
                    borrowing_id: borrowing?.borrowing_id
                }
            })

            message = `${book?.name} checked in. You have a fine of $${fineAmount}`
        } else {
            message =  `${book?.name} checked in `
        }
    })

    return {
        message: message
    }

}

////////////////////////////////////////////////////////////////////////////////
//              Staff picks
////////////////////////////////////////////////////////////////////////////////
export async function addToStaffPicks(book_id: number, path: string) {
    const session = await auth()
    
    if (!session) {
        throw new Error("You must be logged in")
    }

    try {
        await prisma.$transaction([
            prisma.staff_picks.create({
                data: {
                    book_id: +book_id,
                    user_id: session?.user.user_id,
                    pick_date: new Date()
                }
            })
        ])

        revalidatePath(path)
    } catch(error) {
        throw error
    }
}

export async function removeFromStaffPicks(pick_id: number, path: string) {
    const session = await auth()
    
    if (!session) {
        throw new Error("You must be logged in")
    }

    try {
        await prisma.$transaction([
            prisma.staff_picks.delete({
                where: {
                    pick_id: pick_id,
                }
            })
        ])

        revalidatePath(path)
    } catch(error) {
        throw error
    }
}

////////////////////////////////////////////////////////////////////////////////
//              Users
////////////////////////////////////////////////////////////////////////////////
export async function addUser(name: string, email: string, library_card_no: string, role: string, is_active: boolean, path: string) {

    try {

        const hashPassword = await bcrypt.hash('password', 10)

        const category = await prisma.$transaction([
            prisma.users.create({
                data: {
                    name: name,
                    email: email,
                    library_card_no: library_card_no,
                    role: role,
                    is_active: is_active,
                    password: role === 'staff' ? hashPassword : '',
                    image: '',
                    profile_status: role === 'staff' ? 'pending' : ''
                }
            })
        ])

        revalidatePath(path)
        return category

    } catch(error) {
        throw error
    }
}

export async function updateUser(user_id: number, name: string, email: string, library_card_no: string, role: string, is_active: boolean, path: string) {

    if (!user_id) return { message: 'Missing data is required' }

    try {

        // use transaction. If book creation fails we don't want to create category links
        await prisma.$transaction(async (transaction) => {

            await transaction.users.update({
                where: {
                    user_id: user_id
                },
                data: {
                    name: name,
                    email: email,
                    role: role,
                    library_card_no: library_card_no,
                    is_active: is_active,
                }
            })
        })

        if (path) revalidatePath(path)

        return { message: 'user updated' }

    } catch (error) {
        //return { message: 'Database Error: Failed to Update User.' };
        throw error
    }
}

export async function deleteUser(id: number, path: string) {

    try {

        const result = await prisma.$transaction(async (transaction) => {
            await transaction.users.delete({
                where: {
                    user_id: id
                }
            })
        })

        revalidatePath(path)

        return result

    } catch (error) {
        throw error
    }
}

const passwordFormSchema = z.object({
    new_password: z.string().min(8)
})

export async function updateProfile(prevState: State, formData: FormData) {

    const new_password = formData.get('new_password') as string
    const old_password = formData.get('old_password') as string

    const session = await auth()

    if (!session) {
        await signIn()
    }

    const user = await prisma.users.findUnique({
        where: {
            user_id: session?.user.user_id,
            email: session?.user.email as string
        }
    })

    if (!user) {
        return { message: 'Invalid user'}
    }

    if (new_password) {
        const passwordValidate = passwordFormSchema.safeParse({
            new_password: new_password
        })

        if (!passwordValidate.success) {
            return { message: 'Invalid password'}
        }

        const password_match = await bcrypt.compare(old_password, user.password)

        if (!password_match) {
            return { message: 'Invalid password'}
        }

        const new_hash_password = bcrypt.hashSync(new_password, 10)

        await prisma.users.update({
            where: {
                user_id: session?.user.user_id,
                email: session?.user.email as string
            },
            data: {
                password: new_hash_password,
                profile_status: ''
            }
        })

        await signOut({
            redirectTo: `/auth/signin?callbackUrl=${encodeURIComponent('/admin')}&message=${encodeURIComponent('password updated, Please log in.')}`
        })
    }

    return {
        message: 'profile updated'
    }
}


////////////////////////////////////////////////////////////////////////////////
//              Activities
////////////////////////////////////////////////////////////////////////////////
export async function addActivity({ title, description, activity_date, start_time, end_time, age_group, capacity, photos, path }:
    { title: string, description: string, activity_date: Date, start_time: string, end_time: string, age_group: string, capacity: number, photos: string[], path: string }
) {

    try {

        await prisma.$transaction(async t => {
            const result = await t.activities.create({
                data: {
                    title: title,
                    description: description,
                    activity_date: activity_date,
                    start_time: start_time,
                    end_time: end_time,
                    age_group: age_group,
                    capacity: capacity
                }
            })

            console.log(result)
            // save photos
            if (photos && photos.length > 0) {
                const data = photos.map(photo => ({
                    activity_id: result.activity_id,
                    url: photo
                }))

                await t.activity_photos.createMany({ data })
            }
        })

        revalidatePath(path)

    } catch (error) {
        throw error
    }
}

export async function updateActivity({ activity_id, title, description, activity_date, start_time, end_time, age_group, capacity, path }:
    { activity_id: number, title: string, description: string, activity_date: Date, start_time: string, end_time: string, age_group: string, capacity: number, path: string }
) {

    try {

        await prisma.$transaction([
            prisma.activities.update({
                where: {
                    activity_id: activity_id
                },
                data: {
                    title: title,
                    description: description,
                    activity_date: activity_date,
                    start_time: start_time,
                    end_time: end_time,
                    age_group: age_group,
                    capacity: capacity
                }
            })
        ])

        revalidatePath(path)

    } catch(error) {
        throw error
    }
}

export async function deleteActivity(id: number, path: string) {

    try {

        await prisma.$transaction([
            prisma.activities.delete({
                where: {
                    activity_id: id
                }
            })
        ])

        revalidatePath(path)

    } catch(error) {
        throw error
    }
}
////////////////////////////////////////////////////////////////////////////////
//              Fines
////////////////////////////////////////////////////////////////////////////////
export async function markAsPaid(id: number, path: string) {
    try {

        await prisma.$transaction(async (transaction) => {
            await transaction.fines.update({
                where: {
                    fine_id: id
                }, 
                data: {
                    paid_date: new Date()
                }
            })
        })

        revalidatePath(path)

        return { message: "Fine paid" }

    } catch (error) {
        throw error
    }
}

export async function deleteFine(id: number, path: string) {
    try {

        await prisma.$transaction(async (transaction) => {
            await transaction.fines.delete({
                where: {
                    fine_id: id
                }
            })
        })

        revalidatePath(path)

        return { message: "Fine deleted" }

    } catch (error) {
        throw error
    }
}

export async function createCheckoutSession(data: FormData) {

    const session = await auth()
    if (!session) throw new Error("you must be logged in")

    const fine_id = +data.get('fine_id')!   
    const fine = await prisma.fines.findUnique({
        where: {
            fine_id: fine_id
        },
        include: {
            borrowings: {
                include: {
                    books: {
                        select: { name: true }
                    }
                }
            }
        }
    })

    const checkoutSession = await stripe.checkout.sessions.create({
        mode: 'payment',
        submit_type: 'pay',
        metadata: {
            fine_id: fine_id
        },
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: 'cad',
                    product_data: {
                        name: `Late return fine for ${fine?.borrowings.books.name}`
                    },
                    unit_amount: formatAmountForStripe((fine?.fine_amount as unknown) as number, 'CAD')
                }
            }
        ],
        success_url: `${(await headers()).get('origin')}/fine/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${(await headers()).get('origin')}`
    })

    redirect(checkoutSession.url!)
}

////////////////////////////////////////////////////////////////////////////////
//              Photos
////////////////////////////////////////////////////////////////////////////////
export async function addPhoto(table: string, entity_id: number, url: string, path: string) {

    try {

        const newPhoto = await prisma.$transaction( async t => {

            if (table === 'book') {
                return await t.book_photos.create({
                    data: {
                        book_id: entity_id,
                        url: url
                    }
                })
            } else if (table === 'activity') {
                return await t.activity_photos.create({
                    data: {
                        activity_id: entity_id,
                        url: url
                    }
                })
            }
        })

        revalidatePath(path)
        return {photo_id: newPhoto?.photo_id as number, url: newPhoto?.url as string}

    } catch(error) {
        throw error
    }
}

export async function deletePhoto(table: string, id: number, path: string) {

    try {

        const result = await prisma.$transaction( async t => {

            if (table === 'book') {
                await t.book_photos.delete({
                    where: {
                        photo_id: id,
                    }
                })
            } else if (table === 'activity') {
                await t.activity_photos.delete({
                    where: {
                        photo_id: id,
                    }
                })
            }
        })

        revalidatePath(path)
        return result

    } catch(error) {
        throw error
    }
}

////////////////////////////////////////////////////////////////////////////////
//              Rating
////////////////////////////////////////////////////////////////////////////////
export async function addRating(book_id: number, prevState: State, formData: FormData) {

    const session = await auth()

    if (!session) {
        return { message: "You must be logged in" }
    }

    await prisma.$transaction([
        prisma.ratings.create({
            data: {
                book_id: book_id,
                user_id: session?.user.user_id,
                rating: +formData.get('rating')!,
                review: formData.get('comment')?.toString()
            }
        })
    ])

    return {
        message: "Thank you for your review"
    }
}


export type State = {
    message?: string | null
}