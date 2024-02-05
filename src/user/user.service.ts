import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from "./dto/create-user.dto";
import { hash } from 'bcrypt';

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
}
