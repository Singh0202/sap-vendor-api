import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vendor_header')
export class VendorHeader {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    contact_number: string;

    @Column()
    email: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}