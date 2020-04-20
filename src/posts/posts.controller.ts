import {
    Controller,
    Post,
    Body,
    UseInterceptors,
    UseGuards,
    UploadedFiles,
    Get,
    Query,
    Param,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { User } from 'src/global/decorator/user';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { UserTypesGuard } from 'src/global/guard/user-types.guard';
import { UserTypes } from 'src/global/decorator/userTypes';
import { UserType } from 'src/global/enum';
import { CreatePostDto } from './dto/create-post.dto';
import { OParseIntPipe } from '../global/pipes/o-parse-int.pipe';
import { ParseSortPipe } from '../global/pipes/parse-sort.pipe';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';

@UseGuards(UserTypesGuard)
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @UserTypes(UserType.USER)
    @Post('create')
    @UseInterceptors(AnyFilesInterceptor())
    async create(@Body() createPostDto: CreatePostDto, @User() user, @UploadedFiles() files) {
        const images = files.filter(f => f.fieldname === 'images');
        const { post } = await this.postsService.create(createPostDto, user, images);
        return { post };
    }

    @UserTypes(UserType.USER)
    @Post(':idPost/add-comment')
    async addComment(@User() user, @Body() body: CreateCommentDto, @Param("idPost") id) {
        const comment = await this.postsService.addComment(id, user, body)
        return { comment };
    }

    @UserTypes(UserType.USER)
    @Post(':idPost/post/:id/delete-comment')
    async deleteComment(@User() user, @Param("idPost") postId, @Param("id") id) {
        const comment = await this.postsService.deleteComment(postId, id, user)
        return { comment };
    }

    @UserTypes(UserType.USER)
    @Get('get-posts')
    @UseInterceptors(AnyFilesInterceptor())
    async getPost(
        @User() user,
        @Query('skip', new OParseIntPipe()) qSkip,
        @Query('limit', new OParseIntPipe()) qLimit,
    ) {
        const [posts, skip, limit, count] = await this.postsService.getPost(qSkip, qLimit);
        return { posts, skip, limit, count };
    }
}
