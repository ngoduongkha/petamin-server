import { ApiProperty } from '@nestjs/swagger';
import { Message } from 'src/database/entities';

export class GetConversationResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  lastMessage: Message;
}
