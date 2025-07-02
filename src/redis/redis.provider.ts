// src/redis/redis.provider.ts
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

export const RedisProvider: Provider = {
  provide: 'REDIS_CLIENT',
  inject: [ConfigService],
  useFactory: (configService:ConfigService) => {
    const url = configService.get<string>('REDIS_URL');
    console.log(`Connecting to Redis at ${url}`);
    return new Redis(url);
  },
};
