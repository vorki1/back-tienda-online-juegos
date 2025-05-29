// src/imagekit/imagekit.service.ts
import { Injectable } from '@nestjs/common';

const ImageKit = require('imagekit');

@Injectable()
export class ImagekitService {
  private imagekit;

  constructor() {
    this.imagekit = new ImageKit({
      publicKey: 'public_m1kWvpUjGydCX4ysIjfgRkIy7Sc=',
      privateKey: 'private_4Pd4m/v+532yD5FmB58R2/ht1BI=',
      urlEndpoint: 'https://ik.imagekit.io/ydhtg1ll3/',
    });
  }

  async uploadFromBase64(base64: string, fileName: string): Promise<string> {
    const result = await this.imagekit.upload({
      file: base64, // debe ser base64 string: data:image/jpeg;base64,...
      fileName,
      folder: '/productos',
      useUniqueFileName: false,
    });
    return result.url;
  }
  async existsFile(fileName: string): Promise<boolean> {
    try {
      const nombres = await this.listarNombresDeArchivos();
      return nombres.includes(fileName);
    } catch (error) {
      console.error('Error al verificar existencia del archivo en ImageKit:', error);
      return false;
    }
  }
  async listarNombresDeArchivos() {
    try {
      const response = await this.imagekit.listFiles({
        limit: 100,
        path: '/productos', // Esto filtra por el folder 'productos'
      });

      const nombres = response.map(file => file.name);

      return nombres;
    } catch (error) {
      console.error('Error al listar archivos en ImageKit:', error);
      return [];
    }
  }
}

