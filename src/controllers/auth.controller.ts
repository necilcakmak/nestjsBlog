import { Body, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { loginModel } from 'src/dto/loginModel';
import { RegisterModel } from 'src/dto/registerModel';
import { AuthService } from 'src/services/auth.service';

@Controller('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() entity: loginModel) {
    const res = await this.authService.login(entity);
    return res;
  }

  @Post('register')
  async register(@Body() entity: RegisterModel) {
    const res = await this.authService.register(entity);
    return res;
  }
}
