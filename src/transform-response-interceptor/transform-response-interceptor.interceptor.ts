import {
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Response } from 'express';
import { map } from 'rxjs/operators';
@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse<Response>();
        const { statusCode } = response;
        const customResponseDto = {
          code: statusCode,
          data:
            response.req.method === 'GET' && data && data.data
              ? data.data
              : data,
          metas:
            response.req.method === 'GET' && data && data.meta ? data.meta : {},
        };
        return customResponseDto;
      }),
    );
  }
}
