import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Role } from 'src/enums/role.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // đặt tên strategy là 'jwt'
  constructor(private configService: ConfigService) {
    // inject ConfigService
    // Lấy secret từ ConfigService
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in .env');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret, // sử dụng secret đã kiểm tra
    });
  }

  validate(payload: { sub: string; username: string; role: Role }) {
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
