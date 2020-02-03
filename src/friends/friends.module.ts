import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { FriendSchema } from './schemas/friend.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Friend', schema: FriendSchema }]), UsersModule],
    controllers: [FriendsController],
    providers: [FriendsService],
    exports: [FriendsService],
})
export class FriendsModule {}
