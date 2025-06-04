/*
  Warnings:

  - You are about to drop the column `activity_date` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `age_group` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `capacity` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `end_time` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `book_id` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `review` on the `ratings` table. All the data in the column will be lost.
  - You are about to drop the `activity_photos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `payment_method` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Made the column `date_of_birth` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "activity_photos" DROP CONSTRAINT "activity_photos_activity_id_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_book_id_fkey";

-- AlterTable
ALTER TABLE "activities" DROP COLUMN "activity_date",
DROP COLUMN "age_group",
DROP COLUMN "capacity",
DROP COLUMN "end_time",
DROP COLUMN "start_time",
ADD COLUMN     "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "book_id",
ADD COLUMN     "payment_details" TEXT,
ADD COLUMN     "payment_method" VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE "ratings" DROP COLUMN "review";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "date_of_birth" SET NOT NULL,
ALTER COLUMN "gender" SET NOT NULL;

-- DropTable
DROP TABLE "activity_photos";

-- CreateTable
CREATE TABLE "payment_books" (
    "payment_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "payment_books_pkey" PRIMARY KEY ("payment_id","book_id")
);

-- CreateTable
CREATE TABLE "reservations" (
    "reservation_id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "reservation_date" DATE NOT NULL,
    "expiration_date" DATE NOT NULL,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("reservation_id")
);

-- CreateIndex
CREATE INDEX "payment_books_book_id_idx" ON "payment_books"("book_id");

-- AddForeignKey
ALTER TABLE "payment_books" ADD CONSTRAINT "payment_books_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("pay_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_books" ADD CONSTRAINT "payment_books_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("book_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_ibfk_1" FOREIGN KEY ("book_id") REFERENCES "books"("book_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_ibfk_2" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
