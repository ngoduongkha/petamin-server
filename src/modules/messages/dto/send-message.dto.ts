import { MessageType } from 'src/database/enums';

export interface SendMessageRequest {
  message: string;
  conversationId: string;
  type: MessageType;
}

export interface SendMessageResponse {
  id: string;
  userId: string;
  message: string;
  type: MessageType;
}
