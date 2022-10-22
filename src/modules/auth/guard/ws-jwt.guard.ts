import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as SocketIO from 'socket.io';

export class WsJwtGuard extends AuthGuard('wsjwt') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    return context.switchToWs().getClient<SocketIO.Socket>().handshake;
  }
}
