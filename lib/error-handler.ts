// lib/error-handler.ts
import { PlatformType } from '@prisma/client';

export class PlatformError extends Error {
  constructor(message: string, public platform: PlatformType, public originalError?: Error) {
    super(message);
    this.name = 'PlatformError';
  }
}

export function handlePlatformError(error: Error, platform: PlatformType) {
  // TODO: Implement error classification and retry logic
  console.error(`Error from ${platform}:`, error);
  throw new PlatformError(`Failed to fetch content from ${platform}`, platform, error);
}
