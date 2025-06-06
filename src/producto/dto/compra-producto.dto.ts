import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CompraProductoDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsNotEmpty()
    @Type(() => Number)
    stock: number;
}