import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './interfaces/post.interface';
@Injectable()
export class PostsService {
    constructor(@InjectModel('Post') private postModel: Model<Post>) {}
    async create() {
        const post = new this.postModel({
            actor: '5e37da21710af8455435cf30',
            actorModel: 'User',
            content: 'asdasdas',
        });
        await post.save();
        return { post };
    }
}
