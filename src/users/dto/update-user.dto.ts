import { IsString, IsEmail, IsEmpty, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly email: string;
  @IsString()
  @IsOptional()
  @MinLength(6)
  readonly password: string;
  @IsString()
  @IsOptional()
  readonly name: string;
}
