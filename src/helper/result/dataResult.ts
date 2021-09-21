import { Result } from './result';

export class DataResult<T> extends Result {
  data?: T;
  constructor(
    entity: T,
    code?: string,
    message?: string,
    totalCount?: number,
    success?: boolean,
  ) {
    super(code, message, (success = true), totalCount);
    this.data = entity;
  }
}
