import { IsNotEmpty, IsMongoId, IsNumber, Min, Max, IsOptional, IsString } from 'class-validator';

export class CompraProductoDto {
  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @Min(1)
  cantidad: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  valoracion: number;

  @IsOptional()
  @IsString()
  comentario?: string;
}