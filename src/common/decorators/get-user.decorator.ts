import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthPayload } from 'src/modules/auth/interface';

export const GetUser = createParamDecorator(
  (data: keyof AuthPayload | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    if (data) {
      return request.user?.[data];
    }
    return request.user;
  },
);
