import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation, UserConversation } from 'src/database/entities';
import { In, Repository } from 'typeorm';
import { CreateConversationDto } from './dto/create-conversation.dto';

@Injectable()
export class ConversationService {
  private readonly logger = new Logger(ConversationService.name);

  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @InjectRepository(UserConversation)
    private readonly userConversationRepository: Repository<UserConversation>,
  ) {}

  async findByUserId(userId: string): Promise<Conversation[]> {
    const conversations = await this.conversationRepository.find({
      where: { userConversations: { userId } },
      relations: {
        users: true,
      },
    });

    return conversations;
  }

  async getUserConversationIds(userId: string): Promise<string[]> {
    const conversations = await this.userConversationRepository.findBy({ userId });

    return conversations.map((conversation) => conversation.conversationId);
  }

  async create(userId: string, dto: CreateConversationDto): Promise<Conversation> {
    const existingConversation = await this.conversationRepository.findOne({
      where: {
        users: {
          id: userId,
        },
        userConversations: {
          userId: In(dto.userIds),
        },
      },
      select: ['id'],
    });

    if (existingConversation) {
      return this.findById(existingConversation.id);
    }

    const receiverConversations = dto.userIds.map((id) => {
      return this.userConversationRepository.create({ userId: id });
    });

    const senderConversation = this.userConversationRepository.create({
      userId,
    });

    const conversation = await this.conversationRepository.save({
      userConversations: [senderConversation, ...receiverConversations],
    });

    return this.findById(conversation.id);
  }

  async findById(id: string): Promise<Conversation> {
    const conversation = await this.conversationRepository.findOne({
      where: { id },
      relations: { users: true },
    });

    if (conversation) {
      return conversation;
    }

    this.logger.warn('Tried to access a conversation that does not exist');
    throw new BadRequestException('Conversation not found');
  }

  async deleteById(id: string): Promise<boolean> {
    const conversation = await this.findById(id);

    const deleted = await this.conversationRepository.remove(conversation);

    if (deleted) {
      return true;
    }

    this.logger.warn('Tried to delete a conversation that does not exist');
    throw new BadRequestException('Conversation not found');
  }

  async updateLastMessageId(conversationId: string, lastMessageId: string): Promise<void> {
    const result = await this.conversationRepository.update(
      {
        id: conversationId,
      },
      {
        lastMessageId,
      },
    );

    if (result.affected === 0) {
      throw new InternalServerErrorException('Conversation not found');
    }
  }

  async getUserConversations(userId: string): Promise<Conversation[]> {
    const conversationIds = await this.conversationRepository.find({
      where: { userConversations: { userId } },
      select: { id: true },
    });

    const conversations = await this.conversationRepository.find({
      where: { id: In(conversationIds.map((c) => c.id)) },
      relations: {
        users: {
          profile: true,
        },
        lastMessage: true,
      },
    });

    conversations.sort((a, b) => {
      if (a.lastMessage && b.lastMessage) {
        return b.lastMessage.createdAt.getTime() - a.lastMessage.createdAt.getTime();
      }
      if (a.lastMessage) {
        return -1;
      }
      if (b.lastMessage) {
        return 1;
      }
      return 0;
    });

    return conversations;
  }
}
