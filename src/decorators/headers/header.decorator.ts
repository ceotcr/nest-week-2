import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Headers = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.headers;
    },
);