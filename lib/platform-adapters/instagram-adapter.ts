// lib/platform-adapters/instagram-adapter.ts
import { BasePlatformAdapter, ContentItem } from './base-adapter';

export class InstagramAdapter extends BasePlatformAdapter {
  async fetchContent(): Promise<ContentItem[]> {
    // TODO: Implement Instagram content fetching
    console.log('Fetching content from Instagram:', this.connection.url);
    return [];
  }
}
