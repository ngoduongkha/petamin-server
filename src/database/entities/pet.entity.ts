import { Max, Min } from 'class-validator';
import { ColumnDecimalTransformer } from 'src/common/transformers/column-decimal.transformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Gender, Species } from '../enums';
import { Adoption } from './adoption.entity';
import { BaseEntity } from './base.entity';
import { PetPhoto } from './pet-photo.entity';
import { Transaction } from './transaction.entity';
import { User } from './user.entity';

@Entity({ name: 'pets' })
export class Pet extends BaseEntity {
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
    transformer: new ColumnDecimalTransformer(),
  })
  weight: number;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'is_adopting', default: false })
  isAdopting: boolean;

  @Column({ name: 'species', enum: Species, type: 'enum' })
  species: Species;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.pets)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => PetPhoto, (photo) => photo.pet, { cascade: ['insert'] })
  photos: PetPhoto[];

  @OneToMany(() => Adoption, (adoption) => adoption.pet, {
    cascade: ['insert'],
  })
  adoptions: Adoption[];

  @OneToMany(() => Transaction, (transaction) => transaction.pet)
  transactions: Transaction[];
}
