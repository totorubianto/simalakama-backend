import { IsMongoId, IsString } from 'class-validator';

export class ForgotPasswordUserDto {
  @IsString()
  readonly _id: string;
}
