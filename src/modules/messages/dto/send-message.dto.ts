import { MessageType } from 'src/database/enums';

export interface SendMessageDto {
  conversationId: string;
  message: string;
  type: MessageType;
}
