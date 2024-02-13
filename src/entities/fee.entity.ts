import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('fees')
export class fee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'calculated_date', comment: '정산 날짜' })
  calculatedDate: Date;

  @Column({ name: 'calculated_fee', comment: '정산 금액' })
  calculatedFee: number;

  @Column({ name: 'completed_date', nullable: true, comment: '정산된 날짜' })
  completedDate: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
