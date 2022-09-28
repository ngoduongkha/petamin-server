import { Message } from '@entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { MessageListParam } from './dto/message.dto';
import { MessageService } from './message.service';

@ApiTags('message')
@UseGuards(JwtGuard)
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('/')
  async index(@Query() query: MessageListParam) {
    return this.messageService.findAllPaginate(
      query.conversationId,
      query.take,
      query.page,
    );
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Message> {
    const message = await this.messageService.findById(id);
    return message;
  }

  // @Post('/')
  // async create(@Body() inputs: Message): Promise<Message> {
  //   return await this.messageService.create(inputs);
  // }

  // @Put('/:id')
  // async update(
  //   @Param() params,
  //   @Body() inputs: Message,
  // ): Promise<MessageEntity> {
  //   const message = await this.messageService.findById(parseInt(params.id, 0));
  //   this.throwMessageNotFound(message);
  //   return await this.messageService.update(message, inputs);
  // }

  // @Delete('/:id')
  // async delete(@Param() params): Promise<boolean> {
  //   const message = await this.messageService.findById(parseInt(params.id, 0));
  //   this.throwMessageNotFound(message);
  //   return await this.messageService.deleteById(params.id);
  // }

  // throwMessageNotFound(message: MessageEntity) {
  //   if (!message) {
  //     throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  //   }
  // }
}
