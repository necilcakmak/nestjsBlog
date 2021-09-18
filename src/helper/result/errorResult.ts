import { Result } from './result';

export class ErrorResult extends Result {
  constructor(
    code?:string,
    message?: string,
    success?: boolean,
  ) {
    super(code,message, success=false);
  }
}
