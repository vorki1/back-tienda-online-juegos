import { Type } from "class-transformer";
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductoDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    categorias: string[];

    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    precio: number;

    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    stock: number;
    
    @IsString()
    @IsNotEmpty()
    urlImagen: string;
}
