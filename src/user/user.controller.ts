import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
  @Post()
  async create(@Body(new ValidationPipe()) data: CreateUserDto) {
    await this.userService.findOneByEmail(data.email);
    data.password = await this.userService.encryptedPassword(data.password);

    return this.userService.create(data);
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }
}
