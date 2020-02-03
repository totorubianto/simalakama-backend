import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';
import { Friend } from './interfaces/friend.interface';

@Injectable()
export class FriendsService {
    constructor(@InjectModel('Friend') private friendModel: Model<Friend>) {}

    async reject(user: Model<User>, id: string) {
        const friend = await this.friendModel.find();
        return { friend };
    }

    async confirm(user: Model<User>, id: string) {
        const friend = await this.friendModel.find();
        return { friend };
    }

    async addFriend(user: Model<User>, id: string) {
        console.log(id, user);
        throw new BadRequestException('dalam pengerjaan');
        return [];
    }
}
