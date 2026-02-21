/*
  Warnings:

  - You are about to drop the column `userId` on the `OauthAccount` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `RefreshToken` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `VerificationCode` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userUuid,type]` on the table `VerificationCode` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userUuid` to the `OauthAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userUuid` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userUuid` to the `VerificationCode` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OauthAccount" DROP CONSTRAINT "OauthAccount_userId_fkey";

-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "VerificationCode" DROP CONSTRAINT "VerificationCode_userId_fkey";

-- DropIndex
DROP INDEX "VerificationCode_userId_type_key";

-- AlterTable
ALTER TABLE "OauthAccount" DROP COLUMN "userId",
ADD COLUMN     "userUuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "userId",
ADD COLUMN     "userUuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VerificationCode" DROP COLUMN "userId",
ADD COLUMN     "userUuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "VerificationCode_userUuid_type_key" ON "VerificationCode"("userUuid", "type");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OauthAccount" ADD CONSTRAINT "OauthAccount_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationCode" ADD CONSTRAINT "VerificationCode_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
