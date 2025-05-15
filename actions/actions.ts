'use server'

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

////////////////////////////////////////////////////////////////////////////////
//              Comment API
////////////////////////////////////////////////////////////////////////////////

/**
 * API để thêm bình luận hoặc trả lời bình luận cho sách.
 * - Nếu có `comment_id` trong payload thì tạo một **reply** cho comment đó.
 * - Nếu không có `comment_id` thì tạo một **comment mới** cho sách theo `book_id`.
 * 
 * Yêu cầu người dùng phải đăng nhập.
 * 
 * Dữ liệu gửi lên dạng JSON, ví dụ:
 * - Tạo comment mới:
 *    {
 *      "book_id": 123,
 *      "content": "Bình luận về cuốn sách này"
 *    }
 * 
 * - Trả lời comment đã có:
 *    {
 *      "comment_id": 456,
 *      "content": "Trả lời bình luận này"
 *    }
 */
export async function POST(request: Request) {
  // Tạm giả lập session user_id = 1 để test (bạn tạo user này trong DB trước)
  const session = {
    user: {
      user_id: 1,
    }
  }

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
