import { IsString, IsEmail, IsNumberString, MinLength } from 'class-validator';
export class CreateVerificationDto {
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly description: string;
  @IsString()
  readonly token: string;
  @IsString()
  readonly name: string;
}
