import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Gender } from '../enums';
import { BaseEntity } from './base.entity';
import { PetPhoto } from './pet-photo.entity';
import { Species } from './species.entity';
import { User } from './user.entity';

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
  gender: Gender;

  @Column({ name: 'breed', nullable: true })
  breed: string;

  @Column({ name: 'is_neuter', nullable: true })
  isNeuter: boolean;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl: string;

  @Column({
    name: 'weight',
    nullable: true,
    type: 'decimal',
    precision: 3,
    scale: 1,
  })
  weight: number;

  @Column({ name: 'description', nullable: true })
  description: string;

  @ManyToOne(() => Species, (species) => species.pets)
  species?: Species;

  @ManyToOne(() => User, (user) => user.pets)
  user?: User;

  @OneToMany(() => PetPhoto, (photo) => photo.pet)
  photos?: PetPhoto[];
}
