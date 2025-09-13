/*
  Warnings:

  - You are about to drop the column `assignedTo` on the `Issue` table. All the data in the column will be lost.
  - The `status` column on the `Issue` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."IssueStatus" AS ENUM ('SUBMITTED', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED');

-- AlterTable
ALTER TABLE "public"."Issue" DROP COLUMN "assignedTo",
ADD COLUMN     "assignedAt" TIMESTAMP(3),
ADD COLUMN     "assignedDept" TEXT,
ADD COLUMN     "inProgressAt" TIMESTAMP(3),
ADD COLUMN     "resolvedAt" TIMESTAMP(3),
ADD COLUMN     "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."IssueStatus" NOT NULL DEFAULT 'SUBMITTED';

-- CreateTable
CREATE TABLE "public"."IssueEvent" (
    "id" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IssueEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IssueEvent_issueId_createdAt_idx" ON "public"."IssueEvent"("issueId", "createdAt");

-- AddForeignKey
ALTER TABLE "public"."IssueEvent" ADD CONSTRAINT "IssueEvent_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "public"."Issue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
