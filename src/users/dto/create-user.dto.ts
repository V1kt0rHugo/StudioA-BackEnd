import { Roles } from '@prisma/client';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  cellphone: string;
  role: Roles;
}
