import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { readFileSync, writeFile } from 'fs';
import { Observable, map } from 'rxjs';

@Injectable()
export class SaveToRecord2Interceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const id = data.id;

        const fileData = readFileSync('record.txt');

        writeFile(
          'record.txt',
          fileData.toString() +
            '\n' +
            ' The document with the id ' +
            String(id) +
            ' was deleted ',
          (err) => {
            if (err) console.log(err);
            else {
              console.log('File written successfully\n');
              console.log('The written file has the following contents:');
              console.log(readFileSync('record.txt', 'utf8'));
            }
          },
        );

        return data;
      }),
    );
  }
}
