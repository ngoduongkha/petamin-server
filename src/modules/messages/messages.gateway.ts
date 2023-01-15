import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  WsException,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { Logger, UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ConversationService } from '../conversation/conversation.service';
import { MessagesService } from './messages.service';
import { WsJwtGuard } from '../../common/guard';
import { AuthPayload, SocketWithAuth } from '../auth/types';
import { MessageSocketEvent } from './events';
import { SendOnlineDto } from './dto';

@UseGuards(WsJwtGuard)
@WebSocketGateway()
export class MessagesGateway implements OnGatewayConnection {
  @WebSocketServer()
  private readonly server: Server;

  private readonly logger = new Logger(MessagesGateway.name);

  constructor(
    private messagesService: MessagesService,
    private conversationService: ConversationService,
    private jwtService: JwtService,
  ) {}

  // @SubscribeMessage('messages')
  // async messages(client: Socket, payload: SendMessageDto) {
  //   const conversation = await this.conversationService.findById(payload.conversationId);

  //   const userIds = conversation.userConversations.map((userConversation) => {
  //     if (userConversation.userId !== userId) {
  //       return userConversation.userId;
  //     }
  //   });

  //   const message = await this.messagesService.create({
  //     userId,
  //     type: payload.type,
  //     message: payload.message,
  //     conversationId: payload.conversationId,
  //   });

  //   await this.conversationService.updateLastMessageId(payload.conversationId, message.id);

  //   dataSocketId.map((value) => {
  //     this.server.to(value.value).emit('message-received', message);
  //   });
  // }

  async handleConnection(client: Socket): Promise<void> {
    try {
      const { id: userId } = this.getAuthPayload(client);
      const conversationIds = await this.conversationService.getUserConversationIds(userId);

      const onlinePayload: SendOnlineDto = { userId, isOnline: true, socketId: client.id };

      await client.join(conversationIds);
      client.in(conversationIds).emit(MessageSocketEvent.ONLINE, onlinePayload);

      this.logger.log('Client connected', client.id);
    } catch (ex) {
      this.logger.error(ex);
      client.disconnect();
    }
  }

  @SubscribeMessage(MessageSocketEvent.ONLINE)
  handleOnline(
    @ConnectedSocket() client: SocketWithAuth,
    @MessageBody() payload: SendOnlineDto,
  ): void {
    const reply: SendOnlineDto = {
      userId: client.handshake.user.id,
      isOnline: true,
      socketId: client.id,
    };

    client.to(payload.socketId).emit(MessageSocketEvent.ONLINE, reply);
  }

  private getAuthPayload(client: Socket): AuthPayload {
    const authToken = client.handshake.headers.authorization;

    if (!authToken) {
      throw new WsException('Unauthorized');
    }

    const token = authToken.split(' ')[1];

    try {
      return this.jwtService.verify<AuthPayload>(token);
    } catch (ex) {
      throw new WsException('Invalid token');
    }
  }

  // @SubscribeMessage(MessageSocketEvent.MESSAGE_TYPING)
  // async messageTyping(
  //   @ConnectedSocket() client: SocketWithAuth,
  //   @MessageBody() payload: TypingMessageDto,
  // ) {
  //   const { userId } = this.getAuthPayload(client);

  //   const conversation = await this.conversationService.findById(payload.conversationId);

  //   const userIds = conversation.userConversations.map((userConversation) => {
  //     if (userConversation.userId !== userId) {
  //       return userConversation.userId;
  //     }
  //   });
  // }
}
