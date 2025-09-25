import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class RegisterDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  role?: Role;
}
