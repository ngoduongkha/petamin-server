import { MessageType } from 'src/database/enums';

export class SendMessageDto {
  message: string;

  conversationId: string;

  type: MessageType;
}
