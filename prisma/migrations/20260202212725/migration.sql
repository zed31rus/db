/*
  Warnings:

  - A unique constraint covering the columns `[userUuid,provider]` on the table `OauthAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "OauthAccount_provider_userUuid_key";

-- CreateIndex
CREATE UNIQUE INDEX "OauthAccount_userUuid_provider_key" ON "OauthAccount"("userUuid", "provider");
