import {
  IsString,
  IsEmail,
  IsNumberString,
  MinLength,
  IsNotEmpty,
} from 'class-validator';
import { IsUnique } from '../../global/validators/IsUnique';
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  // @IsUnique('email', 'user')
  readonly email: string;
  @IsString()
  @MinLength(6)
  readonly password: string;
  @IsString()
  @IsNotEmpty()
  readonly role: string;
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
