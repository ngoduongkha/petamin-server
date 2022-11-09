import { ColumnDecimalTransformer } from 'src/common/transformers/column-decimal.transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AdoptionStatus } from '../enums';
import { BaseEntity } from './base.entity';
import { Pet } from './pet.entity';
import { User } from './user.entity';

@Entity({ name: 'adoptions' })
export class Adoption extends BaseEntity {
  @Column({
    name: 'price',
    nullable: true,
    type: 'decimal',
    scale: 2,
    transformer: new ColumnDecimalTransformer(),
  })
  price: number;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'status', nullable: true })
  status: AdoptionStatus;

  @Column({ name: 'pet_id' })
  petId: string;

  @ManyToOne(() => Pet, (pet) => pet.adoptions)
  @JoinColumn({ name: 'pet_id' })
  pet?: Pet;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.adoptions)
  @JoinColumn({ name: 'user_id' })
  user?: User;
}
