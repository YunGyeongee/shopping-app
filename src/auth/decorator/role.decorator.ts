import { SetMetadata } from '@nestjs/common';

export const Roles = (admin: string) => SetMetadata('roles', ['admin', 'user']);
