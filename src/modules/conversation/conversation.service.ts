import { Conversation, UserConversation } from '@entity';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConversationDto } from './dto/create-conversation.dto';

@Injectable()
export class ConversationService {
  private readonly logger = new Logger(ConversationService.name);

  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    @InjectRepository(UserConversation)
    private userConversationRepository: Repository<UserConversation>,
  ) {}

  async findUserConversations(userId: string): Promise<Conversation[]> {
    return await this.conversationRepository.find({
      where: { users: { id: userId } },
      relations: { users: true },
    });
  }

  async create(userId: string, dto: CreateConversationDto) {
    const receiverConversations = dto.userIds.map((userId) => {
      const entity = this.userConversationRepository.create({ userId });
      return entity;
    });

    const senderConversation = this.userConversationRepository.create({
      userId,
    });

    const conversation = this.conversationRepository.save({
      userConversations: [senderConversation, ...receiverConversations],
    });

    return conversation;
  }

  async findById(id: string): Promise<Conversation> {
    const conversation = await this.conversationRepository.findOne({
      where: { id },
    });

    if (conversation) {
      return conversation;
    }

    this.logger.warn('Tried to access a conversation that does not exist');
    throw new BadRequestException('Conversation not found');
  }

  // async update() {
  //   return this.conversationRepository.update();
  // }

  async deleteById(id: string): Promise<boolean> {
    const conversation = await this.findById(id);

    const deleted = await this.conversationRepository.remove(conversation);

    if (deleted) {
      return true;
    }

    this.logger.warn('Tried to delete a conversation that does not exist');
    throw new BadRequestException('Conversation not found');
  }
}
