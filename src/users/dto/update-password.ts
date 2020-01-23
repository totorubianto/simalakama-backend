import { IsString, IsOptional, MinLength } from 'class-validator';
import { MatchesProperty } from 'src/global/validators/MatchesProperty';
export class UpdatePasswordUserDto {
    @IsString()
    @MinLength(6)
    readonly oldPassword: string;
    @IsString()
    @MinLength(6)
    readonly newPassword: string;
    @IsString()
    @MinLength(6)
    @MatchesProperty('newPassword')
    readonly newPasswordConfirmation: string;
}
