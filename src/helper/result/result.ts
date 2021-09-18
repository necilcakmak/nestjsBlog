export class Result {
  code?:string;
  message?: string;
  success?: boolean;
  constructor(code?:string,message?: string, success?: boolean) {
    this.message = message;
    this.success = success;
    this.code=code;
  }
}
