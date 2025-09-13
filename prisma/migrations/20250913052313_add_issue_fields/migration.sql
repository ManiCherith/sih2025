/*
  Warnings:

  - You are about to drop the column `comments` on the `Issue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Issue" DROP COLUMN "comments",
ADD COLUMN     "resolutionPhotoPath" TEXT;
