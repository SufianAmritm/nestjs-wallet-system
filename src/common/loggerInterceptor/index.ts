import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();

    const { method, query, url, originalUrl, params } = request;
    Logger.log('Method called ', method);
    Logger.log('Query ', query || null);
    Logger.log('url ', url);
    Logger.log('OriginalUrl ', originalUrl);
    Logger.log('Params: ', params || null);
    return next.handle();
  }
}
