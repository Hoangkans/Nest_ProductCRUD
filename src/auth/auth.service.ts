import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  User,
  UserDocument,
} from '../shared/database/mongo/schemas/user.schema';
import { RegisterDto, LoginDto } from '../shared/database/mongo/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async register(dto: RegisterDto) {
    const { username, password } = dto;
    const hashed = await bcrypt.hash(password, 10);

    const user = new this.userModel({ username, password: hashed });
    await user.save();
    return { message: 'Đăng ký thành công' };
  }

  async login(dto: LoginDto) {
    const { username, password } = dto;
    const user = await this.userModel.findOne({ username });

    if (!user) throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }

    const payload = { sub: user._id, username: user.username };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}
