import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    product_name: string

    @Column()
    price: number

    @Column({default: 0, precision: 2})
    quantity: number
}
