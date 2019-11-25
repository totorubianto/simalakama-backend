import { IsString, IsEmail, IsNumberString } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly password: string;
  @IsString()
  readonly role: string;
  @IsNumberString()
  readonly balance: number;
  @IsString()
  readonly name: string;
}
