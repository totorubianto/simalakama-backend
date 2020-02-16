import {
    Controller,
    Post,
    Body,
    UseInterceptors,
    UseGuards,
    UploadedFiles,
    Get,
    Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { User } from 'src/global/decorator/user';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { UserTypesGuard } from 'src/global/guard/user-types.guard';
import { UserTypes } from 'src/global/decorator/userTypes';
import { UserType } from 'src/global/enum';
import { CreatePostDto } from './dto/create-post.dto';
import { OParseIntPipe } from 'src/global/pipes/o-parse-int.pipe';
import { ParseSortPipe } from 'src/global/pipes/parse-sort.pipe';

@UseGuards(UserTypesGuard)
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @UserTypes(UserType.USER)
    @Post('create')
    @UseInterceptors(AnyFilesInterceptor())
    async create(@Body() createPostDto: CreatePostDto, @User() user, @UploadedFiles() files) {
        const { post } = await this.postsService.create(createPostDto, user, files);
        return { post };
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
