export interface MessagesInterface {
  message: string;
  conversationId: string;
}

export interface CreateMessage {
  userId: string | null;
  conversationId: string | null;
  status: boolean;
  message: string | null;
}

export interface MessageListParam {
  conversationId: string | null;
  take: number | null;
  page: number | null;
}
