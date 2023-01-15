import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Message } from 'src/database/entities';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async findAllPaginate(conversationId: string, query: PaginateQuery): Promise<Paginated<Message>> {
    return paginate(query, this.messageRepository, {
      sortableColumns: ['id', 'createdAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'ASC']],
      where: { conversation: { id: conversationId } },
    });
  }

  async create(inputs: CreateMessageDto): Promise<Message> {
    return this.messageRepository.save(inputs);
  }

  async findById(id: string): Promise<Message> {
    return this.messageRepository.findOneByOrFail({ id });
  }
}
