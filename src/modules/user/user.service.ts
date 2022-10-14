import { User } from '@entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.dto';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly profileService: ProfileService,
  ) {}

  async getUserByEmailAndGetPassword(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
      },
    });
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

    const newUser = this.userRepository.create(registerDto);
    const userCreated = await this.userRepository.save(newUser);

    await this.profileService.create(userCreated.id);

    return userCreated;
  }
}
