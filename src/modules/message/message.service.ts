import { Message } from '@entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async findAll() {
    return await this.messageRepository.find();
  }

  async findAllPaginate() {
    return null;
  }

  async create(message: Partial<Message>): Promise<Message> {
    return await this.messageRepository.save(message);
  }
}
