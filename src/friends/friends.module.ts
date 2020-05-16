import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { FriendSchema } from './schemas/friend.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { UserSchema } from '../users/schema/user.schema';
import { FilesModule } from '../files/files.module';
import { EventModule } from '../event/event.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Friend', schema: FriendSchema }]),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        UsersModule,
        FilesModule,
        EventModule
    ],
    controllers: [FriendsController],
    providers: [FriendsService],
    exports: [FriendsService],
})
export class FriendsModule { }
