import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  zip: number;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true, name: 'address_detail' })
  addressDetail: string;

  @Column({ default: 0 })
  point: number;

  @Column({ default: false, name: 'is_seller' })
  isSeller: boolean;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
