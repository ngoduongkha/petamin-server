import { Conversation } from '@entity';
import {
  Get,
  Controller,
  UseGuards,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';

@ApiTags('conversation')
@UseGuards(JwtGuard)
@ApiBearerAuth('access-token')
@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get('/')
  async getAll() {
    return this.conversationService.findAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Conversation> {
    const conversation = await this.conversationService.findById(id);
    return conversation;
  }

  @ApiBody({ type: CreateConversationDto })
  @Post('/')
  async create(@Body() dto: CreateConversationDto) {
    return await this.conversationService.create(dto);
  }

  // @Put('/:id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() inputs: Conversation,
  // ): Promise<Conversation> {
  //   const conversation = await this.conversationService.findById(id);
  //   return await this.conversationService.update(conversation, inputs);
  // }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<boolean> {
    const result = await this.conversationService.deleteById(id);

    return result;
  }

  @Get('socket/:id')
  async getDataInformation(@Param('id') id: string): Promise<string[]> {
    const conversation = await this.conversationService.findById(id);

    const userId: string[] = [];
    conversation.users.map((user) => {
      userId.push(user.id);
      return user;
    });

    return userId;
  }
}
