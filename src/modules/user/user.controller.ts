import { Conversation, User } from '@entity';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { JwtGuard } from '../../common/guard/jwt.guard';
import { ConversationService } from '../conversation/conversation.service';
import { UserService } from './user.service';

@ApiTags('user')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @Get('conversations')
  async getAllConversation(@GetUser('id') userId: string) {
    const conversations = await this.userService.getUserConversation(userId);
    return conversations;
  }

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
