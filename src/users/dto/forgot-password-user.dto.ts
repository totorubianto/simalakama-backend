import { IsMongoId, IsString } from 'class-validator';

export class ForgotPasswordUserDto {
  @IsString()
  readonly id: string;
}
