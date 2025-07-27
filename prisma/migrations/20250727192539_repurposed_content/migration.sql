-- CreateTable
CREATE TABLE "RepurposedContent" (
    "id" TEXT NOT NULL,
    "contentItemId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "platform" "PlatformType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RepurposedContent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RepurposedContent" ADD CONSTRAINT "RepurposedContent_contentItemId_fkey" FOREIGN KEY ("contentItemId") REFERENCES "ContentItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
