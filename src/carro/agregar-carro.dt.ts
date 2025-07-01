import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AgregarCarroDto {
    @IsNotEmpty()
    @IsString()
    productoId: string;
    @IsNotEmpty()
    @IsNumber()
    cantidad: number;
}