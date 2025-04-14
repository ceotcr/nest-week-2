import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter7 implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const responseBody = exception.getResponse() as { message: string, errors: ValidationError[] };
        const errors: { field: string; code: string }[] = [];

        if (responseBody.errors) {
            responseBody.errors.forEach((error) => {
                if (error.constraints) {
                    Object.keys(error.constraints).forEach((key) => {
                        errors.push({
                            field: error.property,
                            code: error.toString().toUpperCase(),
                        });
                    });
                }
                if (error.children) {
                    error.children.forEach((childError) => {
                        if (childError.constraints) {
                            Object.keys(childError.constraints).forEach((key) => {
                                errors.push({
                                    field: childError.property,
                                    code: childError.toString().toUpperCase(),
                                });
                            });
                        }
                    });
                }
            });
        }
        response.status(status).json({
            message: "Validation failed",
            errors,
        });
    }
}