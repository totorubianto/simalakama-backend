import { IsString, IsEmail, MinLength, IsNotEmpty, IsOptional } from 'class-validator';
import { IsUnique } from '../../global/validators/IsUnique';
import { MatchesProperty } from '../../global/validators/MatchesProperty';

export class CreateCompaniesDto {
    @IsEmail()
    @IsNotEmpty()
    @IsUnique('email', 'companies')
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
    readonly name: string;
    @IsString()
    @IsOptional()
    readonly cover: string;
    @IsString()
    @IsOptional()
    readonly logo: string;
}
