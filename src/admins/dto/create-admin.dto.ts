import {
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsMobilePhone,
    IsNotEmpty,
    IsFQDN,
    IsDate,
    Min,
    Max,
    MinLength,
    MaxLength,
} from 'class-validator';
import { MatchesProperty } from './../../global/validators/MatchesProperty';
import { IsUnique } from './../../global/validators/IsUnique';
import { AdminRoleEnum } from '../../global/enum/admin-role.enum';
import { IsEnum, IsDefined } from 'class-validator';

export class CreateAdminDto {
    @IsNotEmpty()
    readonly firstName: string;
    readonly lastName: string;
    @IsNotEmpty()
    @IsEmail()
    @IsUnique('email', 'admin')
    readonly email: string;
    @IsNotEmpty()
    @IsMobilePhone('id-ID')
    @IsUnique('phoneNumber', 'admin')
    readonly phoneNumber: string;
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
    @IsNotEmpty()
    @MinLength(6)
    @MatchesProperty('password')
    readonly passwordConfirmation: string;
    readonly pin: string;
    readonly dateOfBirth: Date;
    @IsDefined()
    @IsEnum(AdminRoleEnum)
    readonly role: string;
}
