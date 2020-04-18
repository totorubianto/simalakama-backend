import { IsString, IsArray, IsOptional, IsEnum } from 'class-validator';
import { ScopeEnum } from '../../global/enum';

export class CreatePostDto {
    @IsString()
    readonly contents: string;
    @IsOptional()
    @IsArray()
    readonly hashtag: string;
    @IsOptional()
    @IsArray()
    readonly mention: string;
    @IsEnum(ScopeEnum)
    readonly scope: string;
}
