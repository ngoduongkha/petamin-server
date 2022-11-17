import { Conversation, User } from '@entity';
import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { GetUser } from 'src/common/decorators';
import { JwtGuard } from 'src/common/guard';
import { ConversationService } from '../conversation/conversation.service';
import { GetUserDto } from './dto';
import { UserService } from './user.service';

@ApiTags('user')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly conversationService: ConversationService,
  ) {}

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

  @ApiQuery({ type: GetUserDto })
  @ApiOkResponse({ type: Paginated<User> })
  @Get()
  async findAll(
    @Paginate() query: PaginateQuery,
    @GetUser('id') me: string,
  ): Promise<Paginated<User>> {
    return this.userService.findAll(query, me);
  }

  @Get('conversations')
  async getAllConversation(@GetUser('id') userId: string) {
    const conversations = await this.conversationService.getUserConversations(
      userId,
    );
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
