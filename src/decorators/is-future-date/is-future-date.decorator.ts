import { SetMetadata } from '@nestjs/common';

export const IsFutureDate = (...args: string[]) => SetMetadata('is-future-date', args);
