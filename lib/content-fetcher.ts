// lib/content-fetcher.ts
import { PlatformConnection } from '@prisma/client';
import { getPlatformAdapter } from './platform-adapters/platform-adapter-factory';
import { createContentItem, getContentItems } from './content-item';
import { handlePlatformError } from './error-handler';

export async function fetchContent(connection: PlatformConnection) {
  try {
    const adapter = getPlatformAdapter(connection);
    const contentItems = await adapter.fetchContent();
    const existingContentItems = await getContentItems(connection.id);
    const existingUrls = new Set(existingContentItems.map((item) => item.url));

    for (const item of contentItems) {
      if (!existingUrls.has(item.url)) {
        await createContentItem(connection.id, item.title, item.url, item.content, item.metadata);
      }
    }

    return { success: true, content: contentItems };
  } catch (error) {
    handlePlatformError(error as Error, connection.type);
    return { success: false, error: (error as Error).message };
  }
}