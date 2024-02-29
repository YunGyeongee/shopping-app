import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('fees')
export class Fee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'seller_id' })
  sellerId: number;

  @Column({ name: 'calculated_date', comment: '정산 생성 날짜' })
  calculatedDate: Date;

  @Column({ name: 'calculated_fee', comment: '정산 금액' })
  calculatedFee: number;

  @Column({ name: 'completed_date', nullable: true, comment: '지급 날짜' })
  completedDate: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
