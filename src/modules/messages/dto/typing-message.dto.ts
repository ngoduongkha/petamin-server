export interface TypingRequest {
  conversationId: string;
  isTyping: boolean;
}

export interface TypingResponse {
  userId: string;
  isTyping: boolean;
}
