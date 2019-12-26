import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  error: string;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const http = context.switchToHttp();
    const res = http.getResponse();
    const statusCode = res.statusCode;
    let statusMessage = this.generateStatusMessage(statusCode);
    return next.handle().pipe(
      map(data => {
        let untransform;
        if (typeof data === 'object') {
          untransform = data.untransform;
          delete data.untransform;
        }
        if (untransform) {
          return data;
        } else {
          return {
            statusCode: statusCode,
            message: statusMessage,
            data,
          };
        }
      }),
    );
  }

  generateStatusMessage(statusCode: number): string {
    let statusMessage = 'OK';
    switch (statusCode) {
      case HttpStatus.CREATED:
        statusMessage = 'OK';
        break;
      case HttpStatus.BAD_REQUEST:
        statusMessage = 'Bad Request';
        break;
    }
    return statusMessage;
  }
}
