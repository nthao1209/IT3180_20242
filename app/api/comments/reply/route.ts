// File: app/api/comments/reply/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { commentId, content, userId } = await request.json();
    if (!commentId || !content || !userId || isNaN(Number(commentId)) || isNaN(Number(userId))) {
      return NextResponse.json({ error: 'commentId, content, and userId are required and must be valid' }, { status: 400 });
    }

    const commentExists = await prisma.comments.findUnique({ where: { comment_id: Number(commentId) } });
    const userExists = await prisma.users.findUnique({ where: { user_id: Number(userId) } });
    if (!commentExists) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }
    if (!userExists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log(`Creating reply for commentId: ${commentId}, userId: ${userId}`);
    const reply = await prisma.replies.create({
      data: {
        comment_id: Number(commentId),
        user_id: Number(userId),
        content,
      },
      include: {
        users: { select: { name: true } },
      },
    });

    const formattedReply = {
      reply_id: reply.reply_id,
      user: { name: reply.users.name },
      content: reply.content,
      created_at: reply.created_at.toISOString(),
    };

    console.log('Reply created:', formattedReply);
    return NextResponse.json(formattedReply, { status: 201 });
  } catch (error: any) {
    console.error('Error creating reply:', error);
    return NextResponse.json({ error: `Failed to create reply: ${error.message}` }, { status: 500 });
  }
}