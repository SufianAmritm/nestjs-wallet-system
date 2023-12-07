import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'wallet' })
export class BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: false })
  deletedAt: Date;
}
