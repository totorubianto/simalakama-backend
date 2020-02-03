import {
    Controller,
    Post,
    Param,
    UsePipes,
    UseFilters,
    UseInterceptors,
    ValidationPipe,
    HttpCode,
    UseGuards,
    Query,
    Get,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { UserType } from 'src/global/enum';
import { UserTypes } from 'src/global/decorator/userTypes';
import { User } from 'src/global/decorator/user';
import { TransformInterceptor } from 'src/global/interceptor/transform.interceptor';
import { HttpExceptionFilter } from 'src/global/filter/http-exception.filter';
import { UserTypesGuard } from 'src/global/guard/user-types.guard';

@UseGuards(UserTypesGuard)
@Controller('friends')
export class FriendsController {
    constructor(private readonly friendsService: FriendsService) {}

    @UserTypes(UserType.USER)
    @HttpCode(200)
    @Post('add-friend/:idUser')
    async addFriend(@User() user: any, @Param('idUser') id) {
        const users = await this.friendsService.addFriend(user, id);
        return {};
    }

    @UserTypes(UserType.USER)
    @Get('get-friend')
    async getFriend(@User() user: any, @Query('status') status) {
        const friend = await this.friendsService.getFriend(user, status);
        return friend;
    }

    // @reject
    @UserTypes(UserType.USER)
    @Post('reject/:idFriend')
    async reject(@User() user, @Param('idFriend') id) {
        const friend = await this.friendsService.reject(user, id);
        return { friend };
    }

    // @findAll
    @UserTypes(UserType.USER)
    @Get('find-all')
    async findAll(@User() user: any) {
        const users = await this.friendsService.findAll(null, user);
        return { users };
    }

    // @confirm friend
    @UserTypes(UserType.USER)
    @Post('confirm/:idFriend')
    async confirm(@User() user, @Param('idFriend') id) {
        const friend = await this.friendsService.confirm(user, id);
        return { friend };
    }
}
