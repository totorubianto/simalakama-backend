import {
    IsString,
    IsEmail,
    IsNumberString,
    MinLength,
    IsNotEmpty,
    IsOptional,
} from 'class-validator';
import { IsUnique } from '../../global/validators/IsUnique';
import { MatchesProperty } from '../../global/validators/MatchesProperty';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    @IsUnique('email', 'user')
    readonly email: string;
    @IsString()
    @MinLength(6)
    readonly password: string;
    @IsString()
    @MinLength(6)
    @MatchesProperty('password')
    readonly passwordConfirmation: string;
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;
    @IsString()
    @IsOptional()
    readonly lastName: string;
}
