import { User } from '@entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { IdentityEntity } from './base.entity';

@Entity({ name: 'informations' })
export class Information {
  @Column({ name: 'value', length: 255 })
  value: string;

  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.information)
  @JoinColumn({ name: 'user_id' })
  user?: User;
}
