import { Controller, Post, Body, UseInterceptors, UseGuards, UploadedFiles } from '@nestjs/common';
import { PostsService } from './posts.service';
import { User } from 'src/global/decorator/user';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { UserTypesGuard } from 'src/global/guard/user-types.guard';
import { UserTypes } from 'src/global/decorator/userTypes';
import { UserType } from 'src/global/enum';
import { CreatePostDto } from './dto/create-post.dto';

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
}
