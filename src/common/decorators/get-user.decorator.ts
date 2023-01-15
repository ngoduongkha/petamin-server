import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthPayload, RequestWithAuth } from 'src/modules/auth/types';

export const GetUser = createParamDecorator(
  (data: keyof AuthPayload | undefined, ctx: ExecutionContext) => {
    const request: RequestWithAuth = ctx.switchToHttp().getRequest();
    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);
