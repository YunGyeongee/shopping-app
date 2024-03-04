import { SetMetadata } from '@nestjs/common';

export const Roles = () => SetMetadata('roles', ['admin', 'user']);
