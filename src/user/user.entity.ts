import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserPermission } from '../user-permission/user-permission.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  zip: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true, name: 'address_detail' })
  addressDetail: string;

  @Column({ nullable: true })
  provider: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @OneToOne(() => UserPermission, (permission) => permission.userId, {
    eager: true,
  })
  @JoinColumn({ name: 'id' })
  permission: UserPermission;
}
