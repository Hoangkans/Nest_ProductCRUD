import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, UserSchema } from '../shared/database/mongo/schemas/user.schema';
import { JwtStrategy } from './jwt.strategy'; // 🔹 import JwtStrategy

@Module({
  imports: [
    ConfigModule, // 🔹 bắt buộc nếu muốn dùng ConfigService
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // lấy từ .env
        signOptions: { expiresIn: '1h' },
      }),
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy, // 🔹 đăng ký strategy ở đây
  ],
  exports: [AuthService],
})
export class AuthModule {}
