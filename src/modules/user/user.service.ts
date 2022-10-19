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
        password: true,
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
    console.log('registerDto :>> ', registerDto);
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
    console.log('newUser :>> ', newUser);
    const userCreated = await this.userRepository.save(newUser);
    console.log('userCreated :>> ', userCreated);
    return userCreated;
  }
}
