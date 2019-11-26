import { IsString, IsEmail, IsNumber, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  readonly email: string;
  @IsString()
  @MinLength(6)
  readonly password: string;
}
