import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';
import { Friend } from './interfaces/friend.interface';
import { FriendType } from 'src/global/enum/friend-role.enum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FriendsService {
    constructor(
        @InjectModel('Friend') private friendModel: Model<Friend>, // private readonly usersService: UsersService,
    ) {}

    async findOne(query: any) {
        const friend = await this.friendModel.findOne(query);
        return friend;
    }
    async findById(id: string) {
        const friend = await this.friendModel.findById(id);
        return friend;
    }

    async reject(user: Model<User>, id: string) {
        const friend = await this.friendModel.find();
        return friend;
    }

    async confirm(user: Model<User>, id: string) {
        const friend: Model<Friend> = await this.findById(id);
        if (!friend) throw new BadRequestException('friendship not found');
        friend.status = FriendType.FRIEND;
        await friend.save();
        return friend;
    }

    async getFriend(user: Model<User>, status: string) {
        let friend;
        switch (status) {
            case FriendType.PENDING:
                friend = await this.friendModel.find({
                    $and: [{ recipient: user._id }, { status: FriendType.PENDING }],
                });
                break;
            case FriendType.FRIEND:
                friend = await this.friendModel
                    .find({
                        $and: [
                            {
                                $or: [{ recipient: user._id }, { requester: user._id }],
                            },
                            { status: FriendType.FRIEND },
                        ],
                    })
                    .populate('recipient')
                    .populate('requester');
                break;
            default:
                friend = await this.friendModel.find();
                break;
        }
        return friend;
    }

    async addFriend(user: Model<User>, id: string) {
        if (user._id.toString() === id)
            throw new BadRequestException('tidak dapat menambahkan diri sendiri sebagai teman');
        const query = {
            $or: [
                { requester: user._id, recipient: id },
                { requester: id, recipient: user._id },
            ],
        };
        const exist = await this.findOne(query);
        if (exist.status === FriendType.FRIEND)
            throw new BadRequestException('Sudah menjadi teman');
        if (exist.status === FriendType.PENDING)
            throw new BadRequestException('Menunggu konfirmasi');
        const friend = new this.friendModel({
            requester: user._id,
            recipient: id,
            status: FriendType.PENDING,
        });
        await friend.save();
        return friend;
    }
}
