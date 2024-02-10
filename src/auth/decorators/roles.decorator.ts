import { SetMetadata } from '@nestjs/common';
import { RoleUser } from 'src/schemas/user.schema';
export const ROLES_KEY = 'roles';
export const Roles = (roles: RoleUser[]) => SetMetadata(ROLES_KEY, roles);