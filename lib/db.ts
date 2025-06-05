// lib/db.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * === TYPE DEFINITIONS ===
 */

// Báo cáo thống kê
export type SalesReport = {
  totalRevenue: number;
  totalBooksSold: number;
  totalReads: number;
  averageRating: number;
};

// Danh sách thanh toán
export type PaymentRecord = {
  pay_id: number;
  user_id: number;
  amount: number;
  status: string;
  payment_method: string;
  payment_details: string | null;
  paid_at: Date;
};

// Chi tiết thanh toán + các sách liên quan
export type PaymentDetail = PaymentRecord & {
  books: {
    book_id: number;
    amount: number;
  }[];
};

/**
 * === 1. SALES REPORT ===
 * Tổng hợp thống kê cho dashboard admin
 */
export async function fetchSalesReportFromDB(): Promise<SalesReport> {
  // 1) Tổng doanh thu từ các giao dịch có status = 'completed'
  const revenueAggregate = await prisma.payments.aggregate({
    where: { status: 'completed' },
    _sum: { amount: true },
  });
  const totalRevenue = Number(revenueAggregate._sum.amount ?? 0);

  // 2) Tổng số sách đã bán = đếm số dòng trong payment_books
  const totalBooksSold = await prisma.payment_books.count();

  // 3) Tổng lượt đọc = đếm số dòng trong reading_sessions
  const totalReads = await prisma.reading_sessions.count();

  // 4) Trung bình đánh giá của tất cả sách
  const ratingAggregate = await prisma.ratings.aggregate({
    _avg: { rating: true },
  });
  const averageRating = Number(ratingAggregate._avg.rating ?? 0);

  return {
    totalRevenue,
    totalBooksSold,
    totalReads,
    averageRating,
  };
}

/**
 * === 2. ADMIN PAYMENTS ===
 */

// 2.1. Danh sách tất cả payments
export async function getAllPayments(): Promise<PaymentRecord[]> {
  const payments = await prisma.payments.findMany({
    orderBy: { paid_at: 'desc' },
    select: {
      pay_id: true,
      user_id: true,
      amount: true,
      status: true,
      payment_method: true,
      payment_details: true,
      paid_at: true,
    },
  });

  return payments.map((p) => ({
    pay_id: p.pay_id,
    user_id: p.user_id,
    amount: Number(p.amount),
    status: p.status,
    payment_method: p.payment_method,
    payment_details: p.payment_details,
    paid_at: p.paid_at,
  }));
}

// 2.2. Chi tiết một payment theo ID
export async function getPaymentDetail(payId: number): Promise<PaymentDetail | null> {
  const payment = await prisma.payments.findUnique({
    where: { pay_id: payId },
    select: {
      pay_id: true,
      user_id: true,
      amount: true,
      status: true,
      payment_method: true,
      payment_details: true,
      paid_at: true,
      payment_books: {
        select: {
          book_id: true,
          amount: true,
        },
      },
    },
  });

  if (!payment) {
    return null;
  }

  return {
    pay_id: payment.pay_id,
    user_id: payment.user_id,
    amount: Number(payment.amount),
    status: payment.status,
    payment_method: payment.payment_method,
    payment_details: payment.payment_details,
    paid_at: payment.paid_at,
    books: payment.payment_books.map((pb) => ({
      book_id: pb.book_id,
      amount: Number(pb.amount),
    })),
  };
}

export default prisma;
