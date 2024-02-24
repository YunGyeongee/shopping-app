import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async findAll() {
    // todo - 관리자 권한일 경우에만 통과
    return this.userService.findAll();
  }
  @Post()
  async create(@Body(new ValidationPipe()) data: CreateUserDto) {
    await this.userService.findOneByEmail(data.email);
    data.password = await this.userService.encryptedPassword(data.password);

    return this.userService.create(data);
  }
}
