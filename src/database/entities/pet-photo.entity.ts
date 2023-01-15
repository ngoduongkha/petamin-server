import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Pet } from './pet.entity';

@Entity()
export class PetPhoto extends BaseEntity {
  @Column()
  imgUrl: string;

  @Column({ type: 'varchar', nullable: true })
  title: string | null;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @ManyToOne(() => Pet, (pet) => pet.photos)
  pet: Pet;
}
