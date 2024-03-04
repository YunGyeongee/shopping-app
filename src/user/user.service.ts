import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import { UserPermission } from '../user-permission/user-permission.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserPermission)
    private userPermissionRepository: Repository<UserPermission>,
  ) {}

  async findAll() {
    return this.userRepository.find();
  }
  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({
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

    const user = await this.userRepository.save({
      email,
      password,
      phone,
    });

    await this.userPermissionRepository.save({
      user_id: user.id,
      permission: data.isAdmin ? 'admin' : 'user',
    });

    return user;
  }
  async getUserByEmail(email: string) {
    return this.userRepository.findOneBy({
      email,
    });
  }
}
