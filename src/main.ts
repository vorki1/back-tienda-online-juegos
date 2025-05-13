import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import * as bcrypt from 'bcrypt';

//no tomar en cuenta era para generar el hash de la contraseña
/*async function generateHash() {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash('admin123', salt);
  console.log('Hash generado:', hash);
}

generateHash();*/
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS para el frontend
  app.enableCors({
    origin: 'http://localhost:5173',
  });

  // Establecer prefijo global para las rutas
  app.setGlobalPrefix('api');

  // Escuchar en el puerto definido en el entorno o en el puerto 3001
  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();