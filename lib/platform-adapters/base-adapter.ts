// lib/platform-adapters/base-adapter.ts
import { PlatformConnection, Prisma } from '@prisma/client';

export interface ContentItem {
  id: string;
  title: string;
  url: string;
  content: string;
  createdAt: Date;
  metadata?: Prisma.JsonValue;
}

export interface PlatformAdapter {
  fetchContent(): Promise<ContentItem[]>;
}

export abstract class BasePlatformAdapter implements PlatformAdapter {
  constructor(protected connection: PlatformConnection) {}

  abstract fetchContent(): Promise<ContentItem[]>;
}