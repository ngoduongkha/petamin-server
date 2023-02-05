import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionStatus } from 'src/database/enums';
import { DataSource, Repository, EntityManager } from 'typeorm';
import { Transaction } from '../../database/entities/transaction.entity';
import { AdoptionService } from '../adoption/adoption.service';
import { PetService } from '../pet/pet.service';
import { CreateTransferDto } from './dto/create-transfer.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private adoptionService: AdoptionService,
    private petService: PetService,
    private dataSource: DataSource,
    private entityManager: EntityManager,
  ) {}

  async getTransferBetween(me: string, userId: any): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: [
        {
          vendorId: me,
          receiverId: userId,
          isDeleted: false,
        },
        {
          vendorId: userId,
          receiverId: me,
          isDeleted: false,
        },
      ],
    });
  }

  async createTransfer(
    vendorId: string,
    createTransferDto: CreateTransferDto,
  ): Promise<Transaction> {
    const transaction = this.transactionRepository.create({
      status: TransactionStatus.COMPLETE,
      vendorId,
      ...createTransferDto,
    });

    await this.petService.transferToUser(createTransferDto.receiverId, createTransferDto.petId!);
    await this.adoptionService.deleteByPetId(createTransferDto.petId!);

    return this.transactionRepository.save(transaction);
  }

  async findById(transactionId: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOneBy({
      id: transactionId,
    });

    if (!transaction) throw new InternalServerErrorException('Transaction not found');

    return transaction;
  }

  async cancelTransfer(userId: string, transactionId: string): Promise<void> {
    const { vendorId, receiverId, status } = await this.findById(transactionId);
    if (status !== TransactionStatus.PENDING) {
      throw new InternalServerErrorException('Only pending transaction can be canceled');
    }

    if (userId !== vendorId && userId !== receiverId) {
      throw new InternalServerErrorException('Cannot cancel transfer');
    }

    await this.transactionRepository.update(
      {
        id: transactionId,
      },
      {
        status: TransactionStatus.CANCELED,
      },
    );
  }

  async completeTransfer(userId: string, transactionId: string): Promise<void> {
    const { petId, receiverId, status } = await this.findById(transactionId);

    if (status !== TransactionStatus.PENDING) {
      throw new InternalServerErrorException('Only pending transaction can be complete');
    }

    if (userId !== receiverId) {
      throw new InternalServerErrorException('Only receiver can complete transfer');
    }

    // Cancel all pending transactions when complete transfer
    await this.petService.transferToUser(userId, petId!);

    const cancelTrans = this.transactionRepository.update(
      {
        status: TransactionStatus.PENDING,
        petId,
      },
      {
        status: TransactionStatus.CANCELED,
      },
    );

    const completeTrans = this.transactionRepository.update(
      {
        id: transactionId,
      },
      {
        status: TransactionStatus.COMPLETE,
      },
    );

    const deleteAdoptions = this.adoptionService.deleteByPetId(petId!);

    await Promise.all([cancelTrans, deleteAdoptions, completeTrans]);
  }
}
