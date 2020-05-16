import { Controller, Post, Param, Body, UseGuards } from '@nestjs/common';
import { UserTypes } from '../global/decorator/userTypes';
import { UserType } from '../global/enum';
import { User } from '../global/decorator/user';
import { CreateChatDto } from './dto/create-chat.dto';
import { MessagesService } from './messages.service';
import { UserTypesGuard } from '../global/guard/user-types.guard';

@UseGuards(UserTypesGuard)
@Controller('messages')
export class MessagesController {
    constructor(
        private readonly messageService: MessagesService
    ) { }

    @UserTypes(UserType.USER)
    @Post('chat/:idFriend')
    async chat(@User() user, @Param('idFriend') id, @Body() body: CreateChatDto) {
        const friend = await this.messageService.create(user, id, body);
        return {};
    }
}
