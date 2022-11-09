import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Pet } from './pet.entity';

@Entity({ name: 'pet_photo' })
export class PetPhoto extends BaseEntity {
  @Column({ name: 'img_url', nullable: true })
  imgUrl: string;

  @Column({ name: 'title', nullable: true })
  title: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @ManyToOne(() => Pet, (pet) => pet.photos)
  pet: Pet;
}
