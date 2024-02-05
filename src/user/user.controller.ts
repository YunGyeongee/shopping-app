import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
  @Post()
  register(@Body(new ValidationPipe()) data: CreateUserDto) {
    return this.userService.register(data);
  }
}
