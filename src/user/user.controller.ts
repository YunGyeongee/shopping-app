import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @ApiOperation({ summary: '모든 유저 조회' })
  async findAll() {
    // todo - 관리자 권한일 경우에만 통과
    return this.userService.findAll();
  }
  @Post()
  @ApiOperation({ summary: '유저 생성' })
  async create(@Body(new ValidationPipe()) data: CreateUserDto) {
    await this.userService.findOneByEmail(data.email);
    data.password = await this.userService.encryptedPassword(data.password);

    return this.userService.create(data);
  }
}
