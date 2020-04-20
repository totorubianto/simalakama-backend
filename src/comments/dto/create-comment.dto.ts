import { IsNotEmpty, IsDefined } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty()
    readonly comment: string;
    @IsDefined()
    readonly ref: string;
}
