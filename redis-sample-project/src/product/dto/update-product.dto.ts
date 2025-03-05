import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    
    @IsString()
    product_name: string

    @IsNumber({maxDecimalPlaces: 2})
    price: number

    @IsNumber()
    quantity: number
}
