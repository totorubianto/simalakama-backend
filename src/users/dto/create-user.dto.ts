import {
  IsString,
  IsEmail,
  IsNumberString,
  MinLength,
  IsNotEmpty,
} from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
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
