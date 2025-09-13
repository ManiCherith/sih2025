/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `assignedDept` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `inProgressAt` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `resolvedAt` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `submittedAt` on the `Issue` table. All the data in the column will be lost.
  - The `status` column on the `Issue` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `IssueEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."IssueEvent" DROP CONSTRAINT "IssueEvent_issueId_fkey";

-- AlterTable
ALTER TABLE "public"."Issue" DROP COLUMN "assignedAt",
DROP COLUMN "assignedDept",
DROP COLUMN "inProgressAt",
DROP COLUMN "resolvedAt",
DROP COLUMN "submittedAt",
ADD COLUMN     "assignedTo" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'submitted';

-- DropTable
DROP TABLE "public"."IssueEvent";

-- DropEnum
DROP TYPE "public"."IssueStatus";
