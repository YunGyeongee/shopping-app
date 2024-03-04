import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPermission } from '../../user-permission/user-permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(UserPermission)
    private readonly userPermissionRepository: Repository<UserPermission>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    // 적용된 role guard 가 없는 경우
    if (!roles) {
      return false;
    }

    const { user } = context.switchToHttp().getRequest();
    const userId = user.id;

    // 사용자가 없는 경우
    if (!userId) {
      return false;
    }

    const permission = await this.userPermissionRepository.findOne({
      where: { userId },
    });

    return roles[0] === permission.permission;
  }
}
