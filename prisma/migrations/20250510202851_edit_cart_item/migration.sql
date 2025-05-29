/*
  Warnings:

  - Added the required column `price` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_productId_fkey";

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
