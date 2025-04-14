
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter6 implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        const errors: string[] = [];

        if (exception.getResponse()) {
            const responseBody = exception.getResponse();
            if (typeof responseBody === 'string') {
                errors.push(responseBody);
            } else if ('message' in responseBody) {
                if (Array.isArray(responseBody.message)) {
                    errors.push(...responseBody.message);
                } else {
                    errors.push(responseBody.message as string);
                }
            }
        }
        if (status === 400) {
            response.status(status).json({
                message: "Validation failed",
                errors: errors.length > 0 ? errors : ['Bad Request'],
            })
        }
    }
}
