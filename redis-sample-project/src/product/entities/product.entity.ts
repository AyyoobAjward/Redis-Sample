import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column()
    name: string

    @Column()
    price: number

    @Column({default: 0, nullable: true})
    quantity: number
}
