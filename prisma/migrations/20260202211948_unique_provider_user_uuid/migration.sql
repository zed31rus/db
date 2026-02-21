/*
  Warnings:

  - A unique constraint covering the columns `[provider,userUuid]` on the table `OauthAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OauthAccount_provider_userUuid_key" ON "OauthAccount"("provider", "userUuid");
