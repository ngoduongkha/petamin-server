import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Pet } from './pet.entity';

@Entity({ name: 'species' })
export class Species extends BaseEntity {
  constructor(partial: Partial<Species>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'img_url', nullable: true })
  imgUrl: string;

  @OneToMany(() => Pet, (pet) => pet.species)
  pets?: Pet[];
}
