import { IsString, IsEmail, IsNumberString, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  readonly email: string;
  @IsString()
  @MinLength(6)
  readonly password: string;
  @IsString()
  readonly role: string;
  @IsString()
  readonly name: string;
}
