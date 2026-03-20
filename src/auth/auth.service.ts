import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { LoginDto } from './login.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) { }
  async login(loginDto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new NotFoundException('User not Found');
    }

    const isPasswordValid = bcrypt.compareSync(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha Incorreta');
    }

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
      sub: user.id,
    });
    return { acess_token: token };
  }
}
