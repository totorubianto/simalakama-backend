import {
  IsString,
  IsEmail,
  IsNumberString,
  MinLength,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { IsUnique } from '../../global/validators/IsUnique';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsUnique('email', 'user')
  readonly email: string;
  @IsString()
  @MinLength(6)
  readonly password: string;
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;
  @IsString()
  @IsOptional()
  readonly lastName: string;
}
