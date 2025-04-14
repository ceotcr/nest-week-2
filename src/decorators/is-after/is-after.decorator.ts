import { SetMetadata } from '@nestjs/common';

export const IsAfter = (...args: string[]) => SetMetadata('is-after', args);
