import {
  Get,
  Controller,
  UseGuards,
  Param,
  Post,
  Body,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Conversation } from 'src/database/entities';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { JwtGuard } from '../../common/guard/jwt.guard';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';

@ApiTags('conversation')
@UseGuards(JwtGuard)
@ApiBearerAuth('access-token')
@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get('/:id')
  async getById(@Param('id', ParseUUIDPipe) id: string): Promise<Conversation> {
    const conversation = await this.conversationService.findById(id);
    return conversation;
  }

  @Post()
  @ApiBody({ type: CreateConversationDto })
  create(@GetUser('id') userId: string, @Body() dto: CreateConversationDto): Promise<Conversation> {
    return this.conversationService.create(userId, dto);
  }

  @Get()
  @ApiResponse({ type: [Conversation] })
  async getAllConversation(@GetUser('id') userId: string): Promise<Conversation[]> {
    return this.conversationService.getUserConversations(userId);
  }

  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<boolean> {
    return this.conversationService.deleteById(id);
  }
}
