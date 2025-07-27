// lib/cache.ts
import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://localhost:6379',
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}

connectRedis();

export async function setCache(key: string, value: any, expiration = 3600) {
  await redisClient.setEx(key, expiration, JSON.stringify(value));
}

export async function getCache(key: string) {
  const value = await redisClient.get(key);
  return value ? JSON.parse(value) : null;
}

export async function invalidateCache(key: string) {
  await redisClient.del(key);
}
