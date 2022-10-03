import { BaseEntity, Column, Entity, OneToMany } from "typeorm";
import { EGender } from '../enums/profile.enum';
import { Pet } from "./pet.entity";

@Entity({ name: 'species' })
export class Species extends BaseEntity {
  constructor(partial: Partial<Species>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;


  @Column({ nullable: true })
  imgUrl: string;

  @OneToMany(() => Pet, (pet) => pet.species)
  pets: Pet[]

}