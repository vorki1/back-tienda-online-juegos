import { IsArray, ValidateNested, IsOptional, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { CompraProductoDto } from './producto-compra.dto';

export class CreateCompraDto {
  @IsOptional()
  userId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CompraProductoDto)
  productos: CompraProductoDto[];
}