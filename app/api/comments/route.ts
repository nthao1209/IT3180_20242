import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bookId = searchParams.get('bookId');

  if (!bookId) {
    return NextResponse.json({ error: 'Thiếu tham số bookId' }, { status: 400 });
  }

  try {
    const comments = await fetchCommentsFromDatabase(bookId);
    return NextResponse.json(comments);
  } catch (error) {
    console.error('Lỗi khi lấy bình luận:', error);
    return NextResponse.json({ error: 'Không thể lấy bình luận' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { bookId, content, userId } = await request.json();

    if (!bookId || !content || !userId) {
      return NextResponse.json({ error: 'Thiếu bookId, content hoặc userId' }, { status: 400 });
    }

    const newComment = await prisma.comments.create({
      data: {
        book_id: parseInt(bookId),
        user_id: parseInt(userId),
        content,
        created_at: new Date(),
      },
    });

    return NextResponse.json({ message: 'Bình luận đã được thêm', comment: newComment }, { status: 201 });
  } catch (error) {
    console.error('Lỗi khi thêm bình luận:', error);
    return NextResponse.json({ error: 'Không thể thêm bình luận' }, { status: 500 });
  }
}

async function fetchCommentsFromDatabase(bookId: string) {
  const comments = await prisma.comments.findMany({
    where: { book_id: parseInt(bookId) },
    include: {
      user: { select: { name: true, user_id: true } },
      replies: {
        include: {
          users: { select: { name: true } },
        },
      },
    },
  });

  return comments.map((comment) => ({
    comment_id: comment.comment_id,
    user: comment.user || { name: "Người dùng không xác định", user_id: 0 },
    content: comment.content,
    created_at: comment.created_at.toISOString(),
    replies: comment.replies
      ? comment.replies.map((reply) => ({
          reply_id: reply.reply_id,
          user: reply.users || { name: "Người dùng không xác định" },
          content: reply.content,
          created_at: reply.created_at.toISOString(),
        }))
      : [],
  }));
}