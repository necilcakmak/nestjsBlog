import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/auth.controller';
import { RolesGuard } from 'src/guard/roles.guard';
import { jwtConstant } from 'src/helper/jwtConst';
import { UserRepository } from 'src/repositories/user.repository';
import { AuthService } from 'src/services/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register(jwtConstant),
  ],
  controllers: [AuthController],
  providers: [AuthService, { provide: APP_GUARD, useClass: RolesGuard }],
  exports: [AuthService],
})
export class AuthModule {}
