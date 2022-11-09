import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class IdentityEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
}

export abstract class BaseEntity extends IdentityEntity {
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt!: Date;

  @Column({
    name: 'is_deleted',
    type: 'boolean',
    default: false,
    select: false,
  })
  isDeleted!: boolean;
}
