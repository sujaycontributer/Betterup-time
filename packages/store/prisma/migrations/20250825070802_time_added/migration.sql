/*
  Warnings:

  - You are about to drop the column `createdAt` on the `WebsiteTick` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."WebsiteTick" DROP COLUMN "createdAt",
ADD COLUMN     "timeAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
