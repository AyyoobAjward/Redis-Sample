import { IsNumber, IsOptional, IsString } from "class-validator"

export class CreateProductDto {
    @IsString()
    name: string

    @IsNumber()
    price: number

    @IsOptional()
    @IsNumber()
    quantity: number
}
