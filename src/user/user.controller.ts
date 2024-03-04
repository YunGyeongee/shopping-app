import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorator/role.decorator';
import { JwtAuthGuard } from '../auth/security/jwt-auth.guard';
import { RolesGuard } from '../auth/security/roles.guard';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '모든 유저 조회' })
  async findAll() {
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
