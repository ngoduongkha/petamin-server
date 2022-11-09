import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { MessagesService } from './messages.service';

@Controller('messages')
@ApiTags('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('/conversation/:conversationId')
  findAllPaginate(
    @Param('conversationId') conversationId: string,
    @Paginate() query: PaginateQuery,
  ) {
    return this.messagesService.findAllPaginate(conversationId, query);
  }
}
