-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetPasswordExpire" INTEGER,
ADD COLUMN     "resetPasswordToken" TEXT;
