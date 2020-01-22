import { IsString, IsEmail, IsEmpty, MinLength, IsOptional, ValidateIf } from 'class-validator';
import { IsUnique } from '../../global/validators/IsUnique';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @IsEmail()
    @IsUnique('email', 'user')
    @ValidateIf(e => e.email)
    readonly email: string;
    @IsString()
    @IsOptional()
    readonly firstName: string;
    @IsString()
    @IsOptional()
    readonly lastName: string;
}
