import { IsEmail, IsNotEmpty, Length, MinLength } from 'class-validator';

export class RegisterModel {
  @Length(5, 30, { message: 'nickname must be between 5 and 30 characters' })
  @IsNotEmpty({ message: 'not null' })
  nickname: string;

  @Length(5, 40, { message: 'email must be between 5 and 40 characters' })
  @IsNotEmpty({ message: 'not null' })
  email: string;

  @Length(4, 20, { message: 'password must be between 4 and 20 characters' })
  @IsNotEmpty({ message: 'not null' })
  password: string;

  @IsNotEmpty({ message: 'not null' })
  age: number;

  gender?: boolean;
}
