-- CreateEnum
CREATE TYPE "GapStatus" AS ENUM ('OPEN', 'CLOSED', 'IN_PROGRESS');

-- CreateTable
CREATE TABLE "ContentGap" (
    "id" TEXT NOT NULL,
    "contentItemId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "GapStatus" NOT NULL DEFAULT 'OPEN',
    "priority" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentGap_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContentGap" ADD CONSTRAINT "ContentGap_contentItemId_fkey" FOREIGN KEY ("contentItemId") REFERENCES "ContentItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
