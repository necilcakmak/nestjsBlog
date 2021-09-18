import { Result } from './result';

export class DataResult<T> extends Result {
  data?: T;
  totalCount?: number;
  constructor(
    entity: T,
    code?:string,
    message?: string,
    totalCount?: number,
    success?: boolean,
  ) {
    super(code,message, success=true);
    this.data = entity;
    this.totalCount = totalCount;
  }
}
