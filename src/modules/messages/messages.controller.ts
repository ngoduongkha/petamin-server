import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Message } from 'src/database/entities';
import { MessagesService } from './messages.service';

@Controller('messages')
@ApiTags('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('/conversation/:conversationId')
  findAllPaginate(
    @Param('conversationId', new ParseUUIDPipe()) conversationId: string,
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<Message>> {
    return this.messagesService.findAllPaginate(conversationId, query);
  }
}
