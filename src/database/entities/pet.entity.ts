import { BaseEntity, Column, Entity, ManyToOne } from "typeorm";
import { EGender } from '../enums/profile.enum';
import { Species } from './species.entity';

@Entity({ name: 'pets' })
export class Pet extends BaseEntity {
  constructor(partial: Partial<Pet>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  gender: EGender;


  @Column({ nullable: true })
  breed: string;

  @Column({ nullable: true })
  isNeuter: boolean;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ nullable: true })
  weight: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Species, (species) => species.pets)
  species: Species
}