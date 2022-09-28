import { Conversation } from '@entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
  ) {}

  async findAll(): Promise<Conversation[]> {
    return await this.conversationRepository.find();
  }

  async create(inputs: Conversation): Promise<Conversation> {
    return this.conversationRepository.create(inputs);
  }

  async findById(id: string): Promise<Conversation> {
    return await this.conversationRepository.findOne({ where: { id } });
  }

  // async update() {
  //   return this.conversationRepository.update();
  // }

  async deleteById(id: string) {
    return await this.conversationRepository.delete({ id });
  }
}
