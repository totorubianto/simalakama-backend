import { Controller, Post, Body } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}
    @Post('create')
    async create(@Body() body) {
        const { post } = await this.postsService.create();
        return { post };
    }
}
