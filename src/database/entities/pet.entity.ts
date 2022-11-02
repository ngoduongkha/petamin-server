import { Max, Min } from 'class-validator';
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

  @Column({ name: 'month', nullable: true, default: 0 })
  @Min(0)
  @Max(11)
  month: number;

  @Column({ name: 'year', nullable: true, default: 0 })
  @Min(0)
  year: number;

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
