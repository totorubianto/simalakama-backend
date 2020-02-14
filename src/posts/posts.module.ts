import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schemas/post.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }])],
    controllers: [PostsController],
    exports: [PostsService],
    providers: [PostsService],
})
export class PostsModule {}
