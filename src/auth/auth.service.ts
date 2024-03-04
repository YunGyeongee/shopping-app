import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,

    @InjectRepository(User)
    private userRepository: Repository<User>,
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
  async login(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
  async findByEmailOrSave(email: string, fullName: string, provider: string) {
    try {
      const user = await this.userService.getUserByEmail(email);
      if (user) {
        return user;
      }

      return await this.userRepository.save({
        email: email,
        name: fullName,
        provider: provider,
      });
    } catch (err) {
      throw new Error('사용자를 찾거나 생성할 수 없습니다.');
    }
  }
  async googleLogin(req) {
    const { email, firstName, lastName, provider } = req.user;
    const fullName = firstName + lastName;
    const user = await this.findByEmailOrSave(email, fullName, provider);

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
