/*
  Warnings:

  - You are about to drop the column `timeAdded` on the `Website` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Website" DROP COLUMN "timeAdded",
ADD COLUMN     "cretedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
