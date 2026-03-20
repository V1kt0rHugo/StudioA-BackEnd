import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequiredRoles } from 'src/auth/required-roles.decorator';
import { RoleGuard } from 'src/auth/role/role.guard';
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @RequiredRoles('ADMIN', 'MANAGER', 'PROGRAMMER')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @RequiredRoles('ADMIN', 'MANAGER', 'PROGRAMMER')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @RequiredRoles('ADMIN', 'MANAGER', 'PROGRAMMER')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  @RequiredRoles('ADMIN', 'MANAGER')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
