import { User } from '@entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.dto';
import { PaginateQuery, paginate, Paginated } from 'nestjs-paginate';

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

  public findAll(query: PaginateQuery, me?: string): Promise<Paginated<User>> {
    return paginate(query, this.userRepository, {
      sortableColumns: ['id', 'email', 'profile.name'],
      nullSort: 'last',
      searchableColumns: ['profile.name'],
      defaultSortBy: [['profile.name', 'ASC']],
      relations: ['profile'],
      where: {
        id: Not(me),
      },
    });
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

  async searchUsers(search: string) {
    const users = await this.userRepository.find({
      where: {
        email: search,
      },
    });

    return users;
  }
}
