import { IsString, IsOptional, MinLength } from 'class-validator';
import { MatchesProperty } from 'src/global/validators/MatchesProperty';
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
    @MatchesProperty('password')
    readonly newPasswordVerification: string;
}
