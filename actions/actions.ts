'use server'

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth, signIn, signOut } from "@/auth"

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

////////////////////////////////////////////////////////////////////////////////
//              Comment API
////////////////////////////////////////////////////////////////////////////////


export async function POST(request: Request) {
  
  const session = await auth()

  // Nếu chưa đăng nhập, trả về lỗi 401 Unauthorized
  if (!session) {
    return NextResponse.json({ message: "Bạn cần đăng nhập để thực hiện thao tác này" }, { status: 401 })
  }

  // Lấy dữ liệu JSON từ body request
  const body = await request.json()
  const { book_id, comment_id, content } = body

  // Kiểm tra nội dung comment/reply có hợp lệ hay không
  if (!content || content.trim() === '') {
    return NextResponse.json({ message: "Nội dung bình luận không được để trống" }, { status: 400 })
  }

  try {
    if (comment_id) {
      // Nếu có comment_id, nghĩa là tạo reply cho comment đó
      const reply = await prisma.replies.create({
        data: {
          comment_id: comment_id,
          user_id: session.user.user_id,
          content: content,
        }
      })
      return NextResponse.json({ message: "Trả lời bình luận thành công", reply }, { status: 201 })
    } else {
      // Nếu không có comment_id, tạo comment mới cho sách theo book_id
      if (!book_id) {
        return NextResponse.json({ message: "Thiếu book_id khi tạo bình luận mới" }, { status: 400 })
      }
      const comment = await prisma.comments.create({
        data: {
          book_id: book_id,
          user_id: session.user.user_id,
          content: content,
        }
      })
      return NextResponse.json({ message: "Tạo bình luận mới thành công", comment }, { status: 201 })
    }
  } catch (error) {
    // Trả về lỗi server nếu có exception xảy ra
    return NextResponse.json({ message: "Lỗi server, vui lòng thử lại sau", error: (error as Error).message }, { status: 500 })
  }
}
