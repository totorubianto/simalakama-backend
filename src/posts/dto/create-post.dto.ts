import { IsString } from 'class-validator';

export class CreatePostDto {
    @IsString()
    readonly contents: string;
    @IsString()
    readonly hashtag: string;
    @IsString()
    readonly mention: string;
}
