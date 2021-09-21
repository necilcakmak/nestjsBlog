import { Result } from './result';

export class ErrorResult extends Result {
  constructor(
    code?: string,
    message?: string,
    totalCount?: number,
    success?: boolean,
  ) {
    super(code, message, (success = false), (totalCount = 0));
  }
}
