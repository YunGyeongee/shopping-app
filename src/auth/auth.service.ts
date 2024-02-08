import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../user/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new ForbiddenException('등록되지 않은 사용자입니다.');
    }

    if (!(await compare(password, user.password))) {
      throw new ForbiddenException('비밀번호가 일치하지 않습니다.');
    }

    return user;
  }
  async login(user: Users) {
    const payload = {
      email: user.email,
      name: user.name,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}