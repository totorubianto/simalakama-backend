import { IsString, IsOptional, MinLength } from 'class-validator';
export class UpdatePasswordUserDto {
  @IsString()
  @IsOptional()
  @MinLength(6)
  readonly oldPassword: string;
  @IsString()
  @IsOptional()
  @MinLength(6)
  readonly newPassword: string;
  @IsString()
  @IsOptional()
  @MinLength(6)
  readonly newPasswordVerification: string;
}
