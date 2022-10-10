import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EGender } from '../enums/profile.enum';
import { BaseEntity } from './base.entity';
import { PetPhoto } from './pet-photo.entity';
import { Species } from './species.entity';

@Entity({ name: 'pets' })
export class Pet extends BaseEntity {
  constructor(partial: Partial<Pet>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'age', nullable: true })
  age: number;

  @Column({ name: 'gender', nullable: true })
  gender: EGender;

  @Column({ name: 'breed', nullable: true })
  breed: string;

  @Column({ name: 'is_neuter', nullable: true })
  isNeuter: boolean;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl: string;

  @Column({ name: 'weight', nullable: true })
  weight: number;

  @Column({ name: 'description', nullable: true })
  description: string;

  @ManyToOne(() => Species, (species) => species.pets)
  species?: Species;

  @OneToMany(() => PetPhoto, (photo) => photo.pet)
  photos?: PetPhoto[];
}
