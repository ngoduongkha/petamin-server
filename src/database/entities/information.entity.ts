import { User } from '@entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ETypeInformation } from '../enums';
import { BaseEntity } from './base.entity';

@Entity({ name: 'informations' })
export class Information extends BaseEntity {
  constructor(partial: Partial<Information>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ name: 'status', default: false })
  status: boolean;

  @Column({ name: 'type' })
  type: ETypeInformation;

  @Column({ name: 'value', length: 255 })
  value: string;

  @Column({ name: 'user_id', nullable: true })
  userId?: string;

  @ManyToOne(() => User, (user) => user.information)
  @JoinColumn({ name: 'user_id' })
  user?: User;
}
