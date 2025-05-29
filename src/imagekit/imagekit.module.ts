// src/imagekit/imagekit.module.ts
import { Module } from '@nestjs/common';
import { ImagekitService } from './imagekit.service';

@Module({
  providers: [ImagekitService],
  exports: [ImagekitService], // 👈 esto es clave para usarlo en otros módulos
})
export class ImagekitModule {}
