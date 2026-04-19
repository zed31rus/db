-- AlterTable
ALTER TABLE "User" ADD COLUMN     "allowEmailFind" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "allowLoginFind" BOOLEAN NOT NULL DEFAULT true;
