import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { error } from 'console';

import { Request, Response } from 'express';

@Catch()
export class ExceptionHandler implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Something went wrong';
    Logger.error(exception.name);
    Logger.error(exception.message);
    Logger.error(exception.stack);
    response.status(status).json({
      status: false,
      code: status,
      message: message || exception.message,
      error: exception.message,
      data: null,
      path: request.url,
    });
  }
}
