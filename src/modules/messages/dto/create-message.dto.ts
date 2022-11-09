import { MessageType } from 'src/database/enums';

export class CreateMessageDto {
  userId: string;
  message: string;
  conversationId: string;
  type: MessageType;
}
