import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { MessageService } from './message.service';

@ApiTags('message')
@UseGuards(JwtGuard)
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  //   @Get('/')
  //   async index(@Query() query: MessageListParam) {
  //     return this.messageService.findAllPaginate(
  //       query.conversation_id,
  //       query.take,
  //       query.page,
  //     );
  //   }

  //   @Get('/:id')
  //   async getById(@Param() params): Promise<MessageEntity> {
  //     const message = await this.messageService.findById(params.id);
  //     this.throwMessageNotFound(message);
  //     return message;
  //   }

  //   @Post('/')
  //   async create(@Body() inputs: Message): Promise<MessageEntity> {
  //     return await this.messageService.create(inputs);
  //   }

  //   @Put('/:id')
  //   async update(
  //     @Param() params,
  //     @Body() inputs: Message,
  //   ): Promise<MessageEntity> {
  //     const message = await this.messageService.findById(parseInt(params.id, 0));
  //     this.throwMessageNotFound(message);
  //     return await this.messageService.update(message, inputs);
  //   }

  //   @Delete('/:id')
  //   async delete(@Param() params): Promise<boolean> {
  //     const message = await this.messageService.findById(parseInt(params.id, 0));
  //     this.throwMessageNotFound(message);
  //     return await this.messageService.deleteById(params.id);
  //   }

  //   throwMessageNotFound(message: MessageEntity) {
  //     if (!message) {
  //       throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  //     }
  //   }
}
