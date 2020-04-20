import { Controller, HttpCode, Post, Body } from '@nestjs/common';
import { UserTypes } from 'src/global/decorator/userTypes';
import { UserType } from 'src/global/enum';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
    constructor(
        private readonly commentService: CommentsService
    ) { }

    @UserTypes(UserType.USER)
    @HttpCode(200)
    @Post('create')
    async create(@Body() body: CreateCommentDto) {
        const comment = await this.commentService.create(body)
        return { comment };
    }
}
