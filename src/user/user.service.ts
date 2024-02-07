import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { compare, hash } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async getUsers() {
    return this.usersRepository.find();
  }
  async register(data: CreateUserDto) {
    const { email, password, phone } = data;

    const encryptedPassword = await hash(password, 11);

    return this.usersRepository.save({
      email,
      password: encryptedPassword,
      phone,
    });
  }
  async getUserByEmail(email: string) {
    return this.usersRepository.findOneBy({
      email,
    });
  }
  async login(data: LoginUserDto) {
    const { email, password } = data;
    const user = await this.usersRepository.findOneBy({
      email,
    });

    if (!user) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    const match = await compare(password, user.password);

    if (!match) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    return user;
  }
}
