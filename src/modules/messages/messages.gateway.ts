import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  WsException,
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ConversationService } from '../conversation/conversation.service';
import { MessagesService } from './messages.service';
import { WsJwtGuard } from '../../common/guard';
import { AuthPayload, SocketWithAuth } from '../auth/types';
import { MessageSocketEvent } from './events';
import { SendMessageDto, SendTypingDto } from './dto';

@UseGuards(WsJwtGuard)
@WebSocketGateway()
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Server;

  private readonly online: string[] = [];

  constructor(
    private messagesService: MessagesService,
    private conversationService: ConversationService,
    private jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket): Promise<void> {
    const { id: userId } = this.getAuthPayload(client);
    const conversationIds = await this.conversationService.getUserConversationIds(userId);

    await client.join(conversationIds);

    this.online.push(userId);

    this.server.emit(MessageSocketEvent.ONLINE, this.online);
  }

  handleDisconnect(client: Socket): void {
    this.online.splice(this.online.indexOf(client.id), 1);

    this.server.emit(MessageSocketEvent.ONLINE, this.online);
  }

  private getAuthPayload(client: Socket): AuthPayload {
    const authToken = client.handshake.headers.authorization;

    if (!authToken) {
      throw new WsException('Unauthorized');
    }

    const token = authToken.split(' ')[1];

    try {
      const decoded = this.jwtService.verify<AuthPayload>(token);
      return decoded;
    } catch (ex) {
      throw new WsException('Invalid token');
    }
  }

  @SubscribeMessage(MessageSocketEvent.MESSAGE)
  async messages(
    @ConnectedSocket() socket: SocketWithAuth,
    @MessageBody()
    payload: SendMessageDto,
  ): Promise<void> {
    const { conversationId } = payload;
    const { id: userId } = socket.handshake.user;
    const { id } = await this.messagesService.create({ ...payload, userId });

    this.server.to(conversationId).emit(MessageSocketEvent.MESSAGE, { ...payload, userId, id });

    this.conversationService.updateLastMessageId(conversationId, id);
  }

  @SubscribeMessage(MessageSocketEvent.TYPING)
  async messageTyping(
    @ConnectedSocket() socket: SocketWithAuth,
    @MessageBody() payload: SendTypingDto,
  ): Promise<void> {
    const { id: userId } = socket.handshake.user;
    socket.to(payload.conversationId).emit(MessageSocketEvent.TYPING, { ...payload, userId });
  }
}
