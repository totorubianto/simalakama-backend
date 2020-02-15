import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schemas/post.schema';
import { FilesModule } from 'src/files/files.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]), FilesModule],
    controllers: [PostsController],
    exports: [PostsService],
    providers: [PostsService],
})
export class PostsModule {}
