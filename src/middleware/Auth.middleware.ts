import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { User } from 'src/entity/user';
import { ErrorResult } from 'src/helper/result/errorResult';
import { UserService } from 'src/services/user.service';
import { AuthService } from '../services/auth.service';

export interface RequestModel extends Request {
  user: User;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  async use(req: RequestModel, res: Response, next: NextFunction) {
    if (req.headers['authorization']) {
      const token: string = req.headers['authorization'].replace('Bearer ', '');
      const decodedToken = await this.authService.verifyJwtToken(token);
      if (decodedToken === undefined) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json(new ErrorResult('TokenNotValid', 'Token not valid.'));
      }
      const kullanici: User = await this.userService.get(
        decodedToken.kullaniciId,
      );
      if (kullanici) {
        req.user = kullanici;
        next();
      } else {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json(new ErrorResult('UserNotFound', 'user not found'));
      }
    } else {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json(
          new ErrorResult(
            'AuthMiddlewareError',
            'You must be logged in to continue',
          ),
        );
    }
  }
}
