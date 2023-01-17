import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { PaginateQuery, paginate, Paginated } from 'nestjs-paginate';
import { User } from 'src/database/entities';
import { Not, Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserByEmailAndGetPassword(email: string): Promise<User> {
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

  public findAll(query: PaginateQuery, me: string): Promise<Paginated<User>> {
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

  async createUserIfNotExist(registerDto: RegisterDto): Promise<User> {
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

  async searchUsers(search: string): Promise<User[]> {
    const users = await this.userRepository.find({
      where: {
        email: search,
      },
    });

    return users;
  }

  async changePassword(userId: string, oldPwd: string, newPwd: string): Promise<void> {
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
      select: ['password', 'id'],
    });

    const check = await argon.verify(user.password, oldPwd);

    if (!check) {
      throw new BadRequestException('Old password is incorrect');
    }

    await this.userRepository.save({ ...user, password: await argon.hash(newPwd) });
  }
}
