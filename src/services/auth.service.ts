import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { loginModel } from 'src/dto/loginModel';

import { AccessToken } from 'src/dto/accessToken';
import * as bcrypt from 'bcrypt';
import { DataResult } from 'src/helper/result/dataResult';
import { ErrorResult } from 'src/helper/result/errorResult';
import { Role } from 'src/enum/role.enum';
import { User } from 'src/entity/user';
import { UserRepository } from 'src/repositories/user.repository';
import { RegisterDto } from 'src/dto/registerDto';
import { RegisterModel } from 'src/dto/registerModel';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: loginModel): Promise<DataResult<AccessToken>> {
    const user = await this.userRepository.getByEmail(loginDto.email);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      return new ErrorResult('EmailOrPasswordError', 'Email or Password wrong');
    }
    const jwt = await this.createJwtToken(user);
    let token: AccessToken = { token: jwt };

    return new DataResult<AccessToken>(token, 'LoginSuccess', 'Login success');
  }

  async register(register: RegisterModel): Promise<DataResult<RegisterDto>> {
    const kullaniciInDb = await this.userRepository.getByEmail(register.email);
    if (kullaniciInDb) {
      return new ErrorResult('EmailInDb', 'Email used');
    }

    let newUser: User = register;
    if (newUser.email === 'admin') {
      newUser.rol = Role.Admin;
    }
    newUser.password = await bcrypt.hash(newUser.password, 12);
    const kullanici = await this.userRepository.addEntity(newUser);
    let registerDto: RegisterDto = {};
    registerDto.email = kullanici.email;
    registerDto.id = kullanici.id;
    registerDto.nickname = kullanici.nickname;
    return new DataResult<RegisterDto>(
      registerDto,
      'RegisterSuccess',
      'Register success',
    );
  }

  async createJwtToken(user: User) {
    const payload = {
      nickname: user.nickname,
      userId: user.id,
    };
    const jwt = await this.jwtService.signAsync(payload);
    return jwt;
  }

  async verifyJwtToken(jwt: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(jwt);
    } catch (error) {
      return undefined;
    }
  }
}
