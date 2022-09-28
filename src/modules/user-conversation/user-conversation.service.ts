import { UserConversation } from '@entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserConversationDto } from './dto/create-user-conversation.dto';
import { UpdateUserConversationDto } from './dto/update-user-conversation.dto';

@Injectable()
export class UserConversationService {
  constructor(
    @InjectRepository(UserConversation)
    private readonly userConversationRepository: Repository<UserConversation>,
  ) {}

  async findDataUserConversation(userId: string, conversationId: string) {
    return await this.userConversationRepository.findOne({
      where: { userId, conversationId },
    });
  }

  async updateLastMessageId(
    userId: string,
    conversationId: string,
    messageId: number,
  ) {
    const userConversation = await this.findDataUserConversation(
      userId,
      conversationId,
    );
    userConversation.lastMessageId = messageId;
    return await this.userConversationRepository.save(userConversation);
  }

  create(createUserConversationDto: CreateUserConversationDto) {
    return 'This action adds a new userConversation';
  }

  findAll() {
    return `This action returns all userConversation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userConversation`;
  }

  update(id: number, updateUserConversationDto: UpdateUserConversationDto) {
    return `This action updates a #${id} userConversation`;
  }

  remove(id: number) {
    return `This action removes a #${id} userConversation`;
  }
}
