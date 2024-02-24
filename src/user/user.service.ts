import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
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
