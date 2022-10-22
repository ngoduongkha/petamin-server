import { User } from '@entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IdentityEntity } from './base.entity';

@Entity({ name: 'informations' })
export class Information extends IdentityEntity {
  constructor(partial: Partial<Information>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ name: 'value', length: 255 })
  value: string;

  @Column({ name: 'user_id', nullable: true })
  userId?: string;

  @ManyToOne(() => User, (user) => user.information)
  @JoinColumn({ name: 'user_id' })
  user?: User;
}
