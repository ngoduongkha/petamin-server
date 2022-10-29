import { Conversation, User } from '@entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.dto';
import { ConversationService } from '../conversation/conversation.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserByEmailAndGetPassword(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (user) {
      return user;
    }

    throw new BadRequestException('User not found');
  }

  async createUserIfNotExist(registerDto: RegisterDto) {
    const user = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const newUser = this.userRepository.create({
      profile: { name: registerDto.name },
      ...registerDto,
    });

    const userCreated = await this.userRepository.save(newUser);

    return userCreated;
  }
}
