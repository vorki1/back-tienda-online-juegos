import { Module } from '@nestjs/common';
import { CarroService } from './carro.service';
import { CarroController } from './carro.controller';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [CarroController],
  providers: [CarroService],
  exports: [CarroService],
})
export class CarroModule {}
