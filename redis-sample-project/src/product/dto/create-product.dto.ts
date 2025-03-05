import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    
    @IsString()
    product_name: string

    @IsNumber({maxDecimalPlaces: 2})
    price: number

    @IsNumber()
    quantity: number
}
