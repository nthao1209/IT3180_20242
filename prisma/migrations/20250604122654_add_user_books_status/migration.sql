/*
  Warnings:

  - Added the required column `status` to the `user_books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_books" ADD COLUMN     "status" TEXT NOT NULL;
