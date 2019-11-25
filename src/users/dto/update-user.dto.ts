import { IsString, IsEmail, IsNumberString } from 'class-validator';
export class UpdateUserDto {
  readonly email: string;
  readonly password: string;
  readonly role: string;
  readonly name: string;
}