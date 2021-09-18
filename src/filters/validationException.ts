import { BadRequestException } from '@nestjs/common';
import { ErrorResult } from 'src/helper/result/errorResult';

export class ValidationException extends BadRequestException {
  constructor(public errorResult: ErrorResult[]) {
    super();
  }
}
