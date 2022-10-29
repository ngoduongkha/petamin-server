import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesInterface } from './dto/message.dto';
import { ConversationService } from '../conversation/conversation.service';
import { InformationService } from '../information/information.service';
import { JwtService } from '@nestjs/jwt';
import { SaveInformationDto } from '../information/dto/save-infomation.dto';
import { AuthPayload } from '../auth/interface/auth-payload.interface';
import { UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { WsJwtGuard } from '../../common/guard';

@UseGuards(WsJwtGuard)
@WebSocketGateway({ cors: { origin: '*' } })
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() private readonly server: Server;

  constructor(
    private messagesService: MessagesService,
    private conversationService: ConversationService,
    private informationService: InformationService,
    private jwtService: JwtService,
  ) {}

  @SubscribeMessage('messages')
  async messages(client: Socket, payload: MessagesInterface) {
    const { userId } = await this.getAuthPayload(client);

    const conversation = await this.conversationService.findById(
      payload.conversationId,
    );

    const userIds = conversation.userConversations.map((userConversation) => {
      if (userConversation.userId !== userId) {
        return userConversation.userId;
      }
    });

    const dataSocketId = await this.informationService.findSocketId(userIds);

    const message = await this.messagesService.create({
      userId,
      status: false,
      message: payload.message,
      conversationId: payload.conversationId,
    });

    dataSocketId.map((value) => {
      this.server.to(value.value).emit('message-received', message);
    });
  }

  async handleConnection(client: Socket) {
    const { userId } = await this.getAuthPayload(client);
    const information: SaveInformationDto = {
      userId,
      status: false,
      value: client.id,
    };

    await this.informationService.create(information);

    // need handle insert socketId to information table
    client.on('room', (room) => {
      client.join(room);
    });
  }

  async handleDisconnect(client: Socket) {
    const { userId } = await this.getAuthPayload(client);
    await this.informationService.deleteByValue(userId, client.id);
  }

  async getAuthPayload(client: Socket): Promise<AuthPayload> {
    const authToken = client.handshake?.headers?.authorization;
    const token = authToken.split(' ')[1];

    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return decoded;
    } catch (ex) {
      throw new WsException('Invalid token');
    }
  }
}
