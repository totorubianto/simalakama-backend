import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './interfaces/post.interface';
import { User } from 'src/users/interfaces/user.interface';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';
import { FileType } from 'src/global/enum/file-type.enum';
@Injectable()
export class PostsService {
    constructor(
        @InjectModel('Post') private postModel: Model<Post>,
        private readonly filesService: FilesService,
    ) {}
    async create(body: any, user: Model<User>, files: any[]) {
        const post = new this.postModel({
            actor: user._id,
            actorModel: user.constructor.modelName,
            content: 'asdasdas',
        });
        const images = await this.uploadImages(files, user);
        post.images = images;
        await post.save();
        return { post };
    }

    async uploadImages(files: any[], user) {
        let images = [];
        for (let index = 0; index < files.length; index++) {
            const file = await this.filesService.upload(
                files[index],
                FileType.LOCAL_IMAGES,
                `Post :${user._id}`,
            );
            await images.push(file);
        }
        return images;
    }
}
