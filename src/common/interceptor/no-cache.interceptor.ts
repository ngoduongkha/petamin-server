import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

export class NoCacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    context
      .switchToHttp()
      .getResponse()
      .header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    context.switchToHttp().getResponse().header('Expires', '-1');
    context.switchToHttp().getResponse().header('Pragma', 'no-cache');
    context
      .switchToHttp()
      .getResponse()
      .header('Acess-Control-Allow-Origin', '*');
    return next.handle();
  }
}
