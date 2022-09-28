import { Message } from '@entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessage } from './dto/message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  async findAllPaginate(
    conversationId: string,
    take: number | null,
    page: number | null,
  ): Promise<Message[]> {
    return await this.messageRepository.find({
      skip: take * (page - 1),
      take: take,
      where: { conversationId },
    });
  }

  async create(inputs: CreateMessage): Promise<Message> {
    return await this.messageRepository.save(inputs);
  }

  async findById(id: string): Promise<Message> {
    return await this.messageRepository.findOne({ where: { id } });
  }

  // async update(
  //   message: MessageEntity,
  //   inputs: Message,
  // ): Promise<MessageEntity> {
  //   return await this.messagesRepository.updateEntity(message, inputs);
  // }

  async deleteById(id: string): Promise<Message> {
    const message = await this.messageRepository.findOne({ where: { id } });
    return await this.messageRepository.remove(message);
  }
}
