import { Injectable, PayloadTooLargeException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './interfaces/post.interface';
import { User } from 'src/users/interfaces/user.interface';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';
import { FileType } from 'src/global/enum/file-type.enum';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
@Injectable()
export class PostsService {
    constructor(
        @InjectModel('Post') private postModel: Model<Post>,
        private readonly filesService: FilesService,
    ) { }
    async create(createPostDto: CreatePostDto, user: Model<User>, files: any[]) {
        const post = new this.postModel({
            actor: user._id,
            actorModel: user.constructor.modelName,
            content: createPostDto.contents,
            hashtag: createPostDto.hashtag,
            mention: createPostDto.mention,
            scope: createPostDto.scope
        });
        if (files.length > 5) {
            throw new BadRequestException('File tidak boleh melebihi 5');
        }
        if (!this.filesService.isImagesArr(files)) {
            throw new BadRequestException('Invalid image file type!');
        }
        const maxSizeMB = 1;
        if (this.filesService.maxSizeArr(maxSizeMB, files)) {
            throw new PayloadTooLargeException('Payload to larage image!');
        }
        const images = await this.uploadImages(files, user);
        post.images = images;
        await post.save();
        post.actor = user;
        return { post };
    }

    async findById(id: string) {
        const post = await this.postModel.findById(id)
        return post;
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

    // get post
    async getPost(skip?: number, limit?: number): Promise<[User[], number, number, number]> {
        let query = {};
        let cursor = this.postModel
            .find(query)
            .populate('images')
            .populate({
                path: 'actor',
                populate: {
                    path: 'avatar',
                },
            });
        if (skip) cursor.skip(skip);
        if (limit) cursor.limit(limit);
        cursor.sort({ createdAt: -1 })
        const posts = await cursor.exec();
        const count = await this.postModel.countDocuments(query);

        return [posts, skip, limit, count];
    }

    async addComment(id, user: Model<User>, body: CreateCommentDto) {
        const post = await this.findById(id)
        if (!post) throw new BadRequestException("tidak ditemukan post id")
        const newComment = {
            actor: user._id,
            comment: body.comment,
            actorModel: "User",
            sub: []
        }
        post.comment.push(newComment)
        await post.save()
        // console.log(post, user, body)
        return post;
    }

    async deleteComment(postId, id: string, user: Model<User>) {
        let post = await this.findById(postId)
        if (!post) throw new BadRequestException("tidak ditemukan post id")
        post.comment = post.comment.filter(data => data._id.toString() !== id)
        // console.log(data)
        await post.save();
        return post;
    }
}
