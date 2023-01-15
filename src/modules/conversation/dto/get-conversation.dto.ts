import { Message } from '@entity';
import { ApiProperty } from '@nestjs/swagger';

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
