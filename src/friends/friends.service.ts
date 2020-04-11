import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';
import { Friend } from './interfaces/friend.interface';
import { FriendType } from 'src/global/enum/friend-role.enum';
import { UsersService } from 'src/users/users.service';
import { FilesService } from 'src/files/files.service';


@Injectable()
export class FriendsService {
    constructor(
        @InjectModel('Friend') private friendModel: Model<Friend>,
        @InjectModel('User') private userModel: Model<Friend>,
        private readonly usersService: UsersService,
        private readonly fileService: FilesService,
    ) { }

    async findOne(query: any) {
        const friend = await this.friendModel.findOne(query);
        return friend;
    }

    async findById(id: string) {
        const friend = await this.friendModel.findById(id);
        return friend;
    }

    // get friend and add virtual field "friend"
    async getFriend(user: Model<User>) {
        let friend = await this.friendModel.aggregate([
            {
                $match: {
                    $and: [
                        {
                            $or: [{ recipient: user._id }, { requester: user._id }],
                        },
                        { status: FriendType.FRIEND },
                    ],
                },
            },
            {
                $addFields: {
                    friend: {
                        $cond: [{ $eq: ['$requester', user._id] }, '$recipient', '$requester'],
                    },
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'requester',
                    foreignField: '_id',
                    as: 'requester',
                },
            },
            { $unwind: { path: '$requester', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'recipient',
                    foreignField: '_id',
                    as: 'recipient',
                },
            },
            { $unwind: { path: '$recipient', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'friend',
                    foreignField: '_id',
                    as: 'friend',
                },
            },
            { $unwind: { path: '$friend', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'files',
                    localField: 'friend.avatar',
                    foreignField: '_id',
                    as: 'friend.avatar',
                },
            },
            { $unwind: { path: '$friend.avatar', preserveNullAndEmptyArrays: true } },
            { $addFields: { "friend.avatar.url": this.fileService.fileUrl("$friend.avatar") } }
        ]);

        return friend;
    }

    //route for add friend
    async addFriend(user: Model<User>, id: string) {
        if (user._id.toString() === id)
            throw new BadRequestException('tidak dapat menambahkan diri sendiri sebagai teman');
        const users = await this.usersService.findById(id);
        if (!users) throw new BadRequestException('user tidak ada');
        const query = {
            $or: [
                { requester: user._id, recipient: id },
                { requester: id, recipient: user._id },
            ],
        };
        const exist = await this.findOne(query);
        switch (exist && exist.status) {
            case FriendType.FRIEND:
                throw new BadRequestException('Sudah menjadi teman');
                break;
            case FriendType.PENDING:
                throw new BadRequestException('Menunggu konfirmasi');
                break;

            default:
                break;
        }
        const friend = new this.friendModel({
            requester: user._id,
            recipient: id,
            status: FriendType.PENDING,
        });
        await friend.save();
        return friend;
    }

    //get pending friend to confirm
    async getPending(user: Model<User>) {
        let friend = await this.friendModel
            .find({
                $and: [{ recipient: user._id }, { status: FriendType.PENDING }],
            })
            .populate('recipient')
            .populate({ path: 'requester', populate: { path: 'avatar' } });
        return friend;
    }

    //confirm friend
    async confirm(user: Model<User>, id: string) {
        const friend: Model<Friend> = await this.findById(id);
        if (!friend) throw new BadRequestException('friendship not found');
        friend.status = FriendType.FRIEND;
        await friend.save();
        return friend;
    }

    //reject user
    async reject(user: Model<User>, id: string) {
        let friend: Model<Friend> = await this.findById(id);
        if (!friend) throw new BadRequestException('tidak ditemukan request pertemanan');
        await friend.remove();
        return {};
    }

    // getall user service
    async getAll(query: any, user: Model<User>): Promise<User[]> {
        const friend = await this.getFriend(user);
        let arrayNin = [];
        friend.map(data => arrayNin.push(data.friend._id));
        arrayNin.push(user._id);
        let unique = [...new Set(arrayNin)];

        // for array use $nin
        // for object use $ni
        const users = await this.userModel.find({ _id: { $nin: unique } });
        return users;
    }
}
