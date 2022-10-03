import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { UserService } from './user.service';

@ApiTags('user')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getAll() {
    return this.userService.findAll();
  }

  // @Get('messages/:id/:status')
  // @UseInterceptors(ClassSerializerInterceptor)
  // async getByIdAndMessageStatus(@Param() params): Promise<UserEntity> {
  //   const user = await this.usersService.findUserAndMessageReadById(
  //     params.id,
  //     params.status,
  //   );
  //   this.throwUserNotFound(user);
  //   return user;
  // }

  // @Get('conversation/:id')
  // async userConversation(@Param() params): Promise<UserEntity> {
  //   const user = await this.usersService.findById(params.id, [
  //     'profile',
  //     'conversations',
  //     'conversations.messages',
  //   ]);
  //   this.throwUserNotFound(user);
  //   return user;
  // }

  // @Get('conversations')
  // async getAllConversation(@Request() request): Promise<User | UserEntity> {
  //   const user = await this.usersService.findAllConversations(request.user.id);
  //   return user;
  // }

  // @Post('/')
  // async create(@Body() inputs: CreateUserDto): Promise<UserEntity> {
  //   return await this.usersService.create(inputs);
  // }

  // @Put('/:id')
  // async update(@Param() params, @Body() inputs: User): Promise<UserEntity> {
  //   const user = await this.usersService.findById(parseInt(params.id, 0));
  //   this.throwUserNotFound(user);
  //   return await this.usersService.update(user, inputs);
  // }

  // @Delete('/:id')
  // async delete(@Param() params): Promise<boolean> {
  //   const user = await this.usersService.findById(parseInt(params.id, 0));
  //   this.throwUserNotFound(user);
  //   return await this.usersService.deleteById(params.id);
  // }

  // @Get('/users/:email')
  // async geUsersByEmail(@Param() params) {
  //   return this.usersService.geUsersByEmail(params.email);
  // }
}
