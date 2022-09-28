import { Get, Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { ConversationService } from './conversation.service';

@ApiTags('conversation')
@UseGuards(JwtGuard)
@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get('/')
  async getAll() {
    return this.conversationService.findAll();
  }
}
