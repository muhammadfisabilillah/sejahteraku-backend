import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // REGISTER
  async register(dto: RegisterDto) {
    // 1. Cek duplikat
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { phoneNumber: dto.phoneNumber }],
      },
    });

    if (existing) {
      throw new ConflictException('Email atau No HP sudah terdaftar!');
    }

    // 2. Enkripsi Password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 3. Simpan User
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        phoneNumber: dto.phoneNumber,
        fullName: dto.fullName,
        password: hashedPassword,
        role: 'USER', // Default role
      },
    });

    return { message: 'Registrasi berhasil', user: { id: user.id, email: user.email } };
  }

  // LOGIN
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new UnauthorizedException('Email tidak ditemukan');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Password salah');

    // Bikin Tiket (Token)
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        fullName: user.fullName,
        role: user.role
      }
    };
  }
}