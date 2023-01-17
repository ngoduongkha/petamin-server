import { MessageType } from 'src/database/enums';

export interface SendMessageDto {
  userId: string;
  conversationId: string;
  message: string;
  type: MessageType;
}
