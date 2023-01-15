import { MessageType } from 'src/database/enums';

export interface CreateMessageDto {
  userId: string;
  message: string;
  conversationId: string;
  type: MessageType;
}
