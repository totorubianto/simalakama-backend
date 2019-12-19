import { IsString, IsEmail, IsNumber, MinLength } from 'class-validator';
import { DoesExist } from '../../global/validators/DoesExist';
export class LoginUserDto {
  @IsEmail()
  @DoesExist("email", "user")
  readonly email: string;
  @IsString()
  @MinLength(6)
  readonly password: string;
}
