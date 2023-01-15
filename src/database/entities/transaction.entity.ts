import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Pet, User } from '@entity';
import { TransactionStatus } from '../enums';
import { BaseEntity } from './base.entity';

@Entity({ name: 'transactions' })
export class Transaction extends BaseEntity {
  @Column({ name: 'status', nullable: true })
  status: TransactionStatus;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'vendor_id', nullable: true, select: true })
  vendorId?: string;

  @ManyToOne(() => User, (vendor) => vendor.vendorTransactions)
  @JoinColumn({ name: 'vendor_id' })
  vendor: User;

  @Column({ name: 'receiver_id', nullable: true, select: true })
  receiverId?: string;

  @ManyToOne(() => User, (receiver) => receiver.receiverTransactions)
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;

  @Column({ name: 'pet_id', nullable: true, select: true })
  petId?: string;

  @ManyToOne(() => Pet, (pet) => pet.transactions)
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;
}
