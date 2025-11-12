import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vendor_item')
export class VendorItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    vendorId: number;

    @Column()
    itemName: string;

    @Column('decimal')
    price: number;

    @Column()
    quantity: number;

    @Column({ nullable: true })
    description?: string;
}