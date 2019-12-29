import {
  IsString,
  IsEmail,
  IsEmpty,
  MinLength,
  IsOptional,
} from 'class-validator';
import { IsUnique } from '../../global/validators/IsUnique';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsUnique('email', 'user')
  readonly email: string;
  @IsString()
  @IsOptional()
  readonly name: string;
}
