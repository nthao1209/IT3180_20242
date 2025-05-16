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
import { Gender } from '@prisma/client';
////////////////////////////////////////////////////////////////////////////////
//              Book
////////////////////////////////////////////////////////////////////////////////


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

export async function placeHold(book_id: number, path: string) {
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
}

export async function cancelHold(id: number, path: string) {
//     await prisma.$transaction(t => (
//         t.reservations.delete({
//             where: {
//                 reservation_id: id
//             }
//         })
//     ))

//     revalidatePath(path)
}

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
//              Users
////////////////////////////////////////////////////////////////////////////////
export async function addUser(username:string,name: string, email: string,date_of_birth:string,gender:string, role:string,path:string) {

    try {

        const hashPassword = await bcrypt.hash('password', 10)
        const genderEnum = Gender[gender as keyof typeof Gender];

        const category = await prisma.$transaction([
            prisma.users.create({
                data: {
                    username:username,
                    name: name,
                    email: email,
                    date_of_birth : date_of_birth,
                    gender:genderEnum,
                    role: role,
                    password: role === 'staff' ? hashPassword : '',
                }
            })
        ])

        revalidatePath(path)
        return category

    } catch(error) {
        throw error
    }
}

export async function updateUser(user_id: number,username:string, name: string, email: string,date_of_birth:string, gender:string, role: string, path: string) {
    
    const dobDate = new Date(date_of_birth);

    if (isNaN(dobDate.getTime())) {
        throw new Error("Ngày sinh không hợp lệ");
    } 
    const genderEnum = Gender[gender as keyof typeof Gender];


    if (!user_id) return { message: 'Missing data is required' }

    try {

        // use transaction. If book creation fails we don't want to create category links
        await prisma.$transaction(async (transaction) => {

            await transaction.users.update({
                where: {
                    user_id: user_id
                },
                data: {
                    username:username,
                    name: name,
                    email: email,
                    date_of_birth:dobDate,
                    gender: genderEnum,
                    role: role,
                }
            })
        })

        if (path) revalidatePath(path)

        return { message: 'user updated' }

    } catch (error) {
        return { message: 'Database Error: Failed to Update User.' };
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


export async function updateProfile(state: State | undefined, formData: FormData):Promise<State> {
  const session = await auth();

  if (!session) {
    await signIn();
    return { message: 'Vui lòng đăng nhập' };
  }

  console.log('session:', session);
  const user = await prisma.users.findUnique({
    where: {
        email: session.user.email ?? undefined
        },
  });

  if (!user) {
    return { message: 'Người dùng không hợp lệ' };
  }

  // Lấy các trường cá nhân
  const username = formData.get('username') as string | null;
  const name = formData.get('name') as string | null;
  const email = formData.get('email') as string | null;
  const date_of_birth_str = formData.get('date_of_birth') as string | null;
  const gender_str = formData.get('gender') as string | null;
  const role = formData.get('role') as string | null;

  // Xử lý ngày sinh
  let date_of_birth: Date | undefined = undefined;
  if (date_of_birth_str) {
    const d = new Date(date_of_birth_str);
    if (!isNaN(d.getTime())) {
      date_of_birth = d;
    } else {
      return { message: 'Ngày sinh không hợp lệ' };
    }
  }

  // Xử lý giới tính
  let gender: Gender | undefined = undefined;
  if (gender_str) {
    const g = Gender[gender_str as keyof typeof Gender];
    if (g) {
      gender = g;
    } else {
      return { message: 'Giới tính không hợp lệ' };
    }
  }

  // Lấy mật khẩu mới, mật khẩu cũ và xác nhận mật khẩu
  const new_password = formData.get('new_password') as string | null;
  const old_password = formData.get('old_password') as string | null;
  const confirm_password = formData.get('confirm_password') as string | null;

  // Chuẩn bị object cập nhật
  const updateData: any = {};

  if (username) updateData.username = username;
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (date_of_birth) updateData.date_of_birth = date_of_birth;
  if (gender) updateData.gender = gender;
  if (role) updateData.role = role;

  // Nếu có thay đổi mật khẩu
  if (new_password) {
    if (!old_password) {
      return { message: 'Bạn phải nhập mật khẩu cũ để đổi mật khẩu mới' };
    }

    if (!confirm_password) {
      return { message: 'Vui lòng nhập lại mật khẩu mới để xác nhận' };
    }

    if (new_password !== confirm_password) {
      return { message: 'Mật khẩu mới và mật khẩu xác nhận không khớp' };
    }

    const passwordValidate = passwordFormSchema.safeParse({ new_password });
    if (!passwordValidate.success) {
      return { message: 'Định dạng mật khẩu mới không hợp lệ' };
    }

    const password_match = await bcrypt.compare(old_password, user.password);
    if (!password_match) {
      return { message: 'Mật khẩu cũ không đúng' };
    }

    const new_hash_password = bcrypt.hashSync(new_password, 10);
    updateData.password = new_hash_password;
  }

    try {
        await prisma.users.update({
        where: { email: session.user.email ?? undefined },
        data: updateData,
        });
        
        await signOut({
                redirectTo: `/auth/signin?callbackUrl=${encodeURIComponent('/admin')}&message=${encodeURIComponent('Mật khẩu đã được cập nhật, vui lòng đăng nhập lại.')}`,
            });
        
  } catch (error) {
    console.error(error);
    return { message: 'Lỗi cơ sở dữ liệu: Cập nhật thông tin thất bại.' };
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
    requireSignOut?: boolean 
}