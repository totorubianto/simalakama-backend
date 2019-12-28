import { IsMongoId, IsString } from 'class-validator';
import { DoesExist } from '../../global/validators/DoesExist';

export class ForgotPasswordUserDto {
  @IsString()
  @DoesExist('email', 'user')
  readonly email: string;
}
