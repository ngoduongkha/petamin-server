import { ApiProperty } from '@nestjs/swagger';
import { PaginateQuery } from 'nestjs-paginate';
import { MessageType } from 'src/database/enums';

export class GetMessageDto implements PaginateQuery {
  @ApiProperty({ type: Number })
  page: number;

  @ApiProperty({ type: Number })
  limit: number;

  sortBy?: [string, string][];

  searchBy?: string[];

  search?: string;

  filter?: { [column: string]: string | string[] };

  path: string;
}

export class GetMessageResponse {
  @ApiProperty()
  status: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty({ enum: MessageType })
  type: MessageType;

  @ApiProperty({ name: 'user_id', nullable: true })
  user?: User;

  @ApiProperty({ name: 'conversation_id' })
  conversationId: string;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  @JoinApiProperty({ name: 'conversation_id' })
  conversation?: Conversation;
}
