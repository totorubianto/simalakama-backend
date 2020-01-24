import { IsString, IsEmail, IsNumber, MinLength, IsBoolean } from 'class-validator';
import { DoesExist } from '../../global/validators/DoesExist';
export class LoginUserDto {
  @IsEmail()
  @DoesExist("email", "user")
  readonly email: string;
  @IsString()
  @MinLength(6)
  readonly password: string;
  @IsBoolean()
  readonly keepLogin: string
}
