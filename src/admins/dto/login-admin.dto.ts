import { IsString, IsEmail, IsNumber, MinLength } from 'class-validator';
import { DoesExist } from '../../global/validators/DoesExist';
export class LoginAdminDto {
  @IsEmail()
  @DoesExist("email", "admin")
  readonly email: string;
  @IsString()
  @MinLength(6)
  readonly password: string;
}
