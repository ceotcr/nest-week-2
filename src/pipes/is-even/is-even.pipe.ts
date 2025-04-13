import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class IsEvenPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const number = Number(value);
    if (isNaN(number)) {
      throw new BadRequestException('Validation failed: Not a number');
    }
    if (number % 2 !== 0) {
      throw new BadRequestException('Validation failed: Not an even number');
    }
    return value;
  }
}
