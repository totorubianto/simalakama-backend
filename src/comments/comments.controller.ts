import { Controller, HttpCode, Post, Body } from '@nestjs/common';
import { UserTypes } from 'src/global/decorator/userTypes';
import { UserType } from 'src/global/enum';

@Controller('comments')
export class CommentsController {
    // @UserTypes(UserType.ADMIN)
    // @HttpCode(200)
    // @Post('logout')
    // async logout(@Body() body:) {
    //     const token = req.headers.authorization.split(' ')[1];
    //     this.adminsService.logout(token);
    //     return {};
    // }
}
