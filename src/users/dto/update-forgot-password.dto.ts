import { IsMongoId, IsString } from 'class-validator';

export class UpdateForgotPasswordUserDto {
    @IsString()
    readonly newPassword: string;
    @IsString()
    readonly newPasswordConfirmation: string;
}
