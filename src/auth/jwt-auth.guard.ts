import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
    // Jika ada error atau user tidak ditemukan (token tidak valid)
    if (err || !user) {
      throw err || new UnauthorizedException('Sesi tidak valid, silakan login kembali.');
    }
    return user;
  }
}