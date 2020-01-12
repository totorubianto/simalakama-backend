import { IsMongoId, IsString, MinLength } from 'class-validator';
import { MatchesProperty } from 'src/global/validators/MatchesProperty';

export class UpdateForgotPasswordUserDto {
    @IsString()
    @MinLength(6)
    readonly newPassword: string;
    @IsString()
    @MinLength(6)
    @MatchesProperty('newPassword')
    readonly newPasswordConfirmation: string;
}
