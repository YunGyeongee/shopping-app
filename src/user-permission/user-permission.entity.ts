import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_permissions')
export class UserPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  permission: string;
}
