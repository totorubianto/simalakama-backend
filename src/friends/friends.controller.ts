import {
    Controller,
    Post,
    Param,
    UsePipes,
    UseFilters,
    UseInterceptors,
    ValidationPipe,
    HttpCode,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { UserType } from 'src/global/enum';
import { UserTypes } from 'src/global/decorator/userTypes';
import { User } from 'src/global/decorator/user';
import { TransformInterceptor } from 'src/global/interceptor/transform.interceptor';
import { HttpExceptionFilter } from 'src/global/filter/http-exception.filter';

@Controller('friends')
@UsePipes(ValidationPipe)
@UseFilters(HttpExceptionFilter)
@UseInterceptors(TransformInterceptor)
export class FriendsController {
    constructor(private readonly friendsService: FriendsService) {}

    @UserTypes(UserType.USER)
    @HttpCode(200)
    @Post('add-friend/:id')
    async addFriend(@User() user: any, @Param('id') id) {
        const users = await this.friendsService.addFriend(user, id);
        return {};
    }

    // @reject
    @UserTypes(UserType.USER)
    @Post('reject/:id')
    async reject(@User() user, @Param('id') id) {
        const friend = await this.friendsService.reject(user, id);
        return { friend };
    }

    // @confirm friend
    @UserTypes(UserType.USER)
    @Post('confirm/:id')
    async confirm(@User() user, @Param('id') id) {
        const friend = await this.friendsService.confirm(user, id);
        return { friend };
    }
}
