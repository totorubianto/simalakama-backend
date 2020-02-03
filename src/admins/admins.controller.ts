import {
    Controller,
    UsePipes,
    UseFilters,
    UseInterceptors,
    ValidationPipe,
    Query,
    Post,
    Get,
    Body,
    Headers,
    Request,
    HttpCode,
    UseGuards,
} from '@nestjs/common';
import { TransformInterceptor } from '../global/interceptor/transform.interceptor';
import { HttpExceptionFilter } from '../global/filter/http-exception.filter';
import { AdminsService } from './admins.service';
import { ClientDevice } from '../global/interfaces/client-devices.interface';
import { LoginAdminDto } from './dto/login-admin.dto';
import { UserType } from '../global/enum';
import { UserTypes } from '../global/decorator/userTypes';
import { User } from '../global/decorator/user';
import { OParseIntPipe } from '../global/pipes/o-parse-int.pipe';
import { ParseSortPipe } from '../global/pipes/parse-sort.pipe';
import { ParseFilterPipe } from '../global/pipes/parse-filter.pipe';
import { ParseSearchPipe } from '../global/pipes/parse-search.pipe';
import { UserTypesGuard } from 'src/global/guard/user-types.guard';

@UseGuards(UserTypesGuard)
@Controller('admins')
export class AdminsController {
    constructor(private readonly adminsService: AdminsService) {}

    // @Login
    @Post('login')
    async login(@Body() loginUserDto: LoginAdminDto) {
        const [login, admin] = await this.adminsService.login(loginUserDto);
        return { login, admin };
    }

    @UserTypes(UserType.ADMIN)
    @Get('me')
    async me(@User() user) {
        return { admin: user };
    }

    @UserTypes(UserType.ADMIN)
    @HttpCode(200)
    @Post('logout')
    async logout(@Request() req) {
        const token = req.headers.authorization.split(' ')[1];
        this.adminsService.logout(token);
        return {};
    }

    @UserTypes(UserType.ADMIN)
    @Get('list')
    async list(
        @User() user,
        @Query('skip', new OParseIntPipe()) qSkip,
        @Query('limit', new OParseIntPipe()) qLimit,
        @Query('sort', new ParseSortPipe()) qSort,
        @Query('filter', new ParseFilterPipe()) qFilter,
        @Query('search', new ParseSearchPipe()) qSearch,
    ) {
        const [admins, skip, limit, count, filter] = await this.adminsService.list(
            qSkip,
            qLimit,
            qSort,
            qFilter,
            qSearch,
        );
        return { admins, skip, limit, count, filter };
    }
}
