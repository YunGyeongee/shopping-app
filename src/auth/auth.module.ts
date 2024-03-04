import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './security/auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './security/jwt.strategy';
import { GoogleStrategy } from './security/google-oauth.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secret_key',
      signOptions: {
        expiresIn: '3h',
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
