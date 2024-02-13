import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
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
  async findOneByEmail(email: string) {
    const user = this.usersRepository.findOne({
      where: { email },
      withDeleted: true,
    });

    if (user) {
      throw new BadRequestException('중복된 이메일 입니다.');
    }

    return user;
  }
  async encryptedPassword(password: string) {
    return await hash(password, 11);
  }
  async create(data: CreateUserDto) {
    const { email, password, phone } = data;

    return this.usersRepository.save({
      email,
      password,
      phone,
    });
  }
  async getUserByEmail(email: string) {
    return this.usersRepository.findOneBy({
      email,
    });
  }
}
