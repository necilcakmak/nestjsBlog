export class Result {
  code?: string;
  message?: string;
  success?: boolean;
  totalCount?: number;
  constructor(
    code?: string,
    message?: string,
    success?: boolean,
    totalCount?: number,
  ) {
    this.message = message;
    this.success = success;
    this.code = code;
    this.totalCount = totalCount;
  }
}
