import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sellers')
export class Seller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ comment: '사업장명' })
  name: string;

  @Column({ name: 'license_number', comment: '사업자번호' })
  licenseNumber: string;

  @Column({ name: 'bank_name', comment: '은행명' })
  bankName: string;

  @Column({ name: 'account_number', comment: '계좌번호' })
  accountNumber: string;

  @Column({ nullable: true })
  zip: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true, name: 'address_detail' })
  addressDetail: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
