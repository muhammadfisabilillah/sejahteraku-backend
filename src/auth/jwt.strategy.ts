import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'rahasia_negara_sejahteraku', // Nanti kita pindah ke .env
    });
  }

  async validate(payload: any) {
    // Ini data yang akan ditempel ke 'req.user' kalau token valid
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}