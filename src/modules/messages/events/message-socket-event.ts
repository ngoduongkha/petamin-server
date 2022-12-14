export enum MessageSocketEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  MESSAGE = 'message',
  MESSAGE_SENT = 'message-sent',
  MESSAGE_RECEIVED = 'message-received',
  MESSAGE_READ = 'message-read',
  MESSAGE_READ_SENT = 'message-read-sent',
  MESSAGE_READ_RECEIVED = 'message-read-received',
  MESSAGE_TYPING = 'message-typing',
  MESSAGE_TYPING_SENT = 'message-typing-sent',
  MESSAGE_TYPING_RECEIVED = 'message-typing-received',
  MESSAGE_REACTION = 'message-reaction',
  MESSAGE_REACTION_SENT = 'message-reaction-sent',
  MESSAGE_REACTION_RECEIVED = 'message-reaction-received',
}
