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

  @Column()
  userId: number;

  @Column({ comment: '사업장명' })
  name: string;

  @Column({ unique: true, comment: '사업자번호' })
  licenseNumber: string;

  @Column({ comment: '은행명' })
  bankName: string;

  @Column({ comment: '계좌번호' })
  accountNumber: string;

  @Column({ nullable: true })
  zip: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  addressDetail: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date | null;
}
