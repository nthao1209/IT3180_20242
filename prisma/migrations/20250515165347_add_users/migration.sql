/*
  Warnings:

  - Added the required column `date_of_birth` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Nam', 'Nữ', 'Khác');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "date_of_birth" DATE NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ALTER COLUMN "name" SET NOT NULL;
