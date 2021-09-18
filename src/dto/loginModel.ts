import { IsNotEmpty, MinLength } from 'class-validator';

export class loginModel {
  @MinLength(5, { message: 'Must be greater than 5 characters' })
  @IsNotEmpty({ message: 'Not null' })
  email: string;

  @MinLength(4, { message: 'Must be greater than 4 characters' })
  @IsNotEmpty({ message: 'Not null' })
  password: string;
}
