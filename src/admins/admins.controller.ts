import { Controller, UsePipes, UseFilters, UseInterceptors, ValidationPipe, Post, Get, Body, Headers, Request } from '@nestjs/common';
import { TransformInterceptor } from '../global/interceptor/transform.interceptor';
import { HttpExceptionFilter } from '../global/filter/http-exception.filter'
import { AdminsService } from './admins.service';
import { ClientDevice } from '../global/interfaces/client-devices.interface';
import { LoginAdminDto } from './dto/login-admin.dto'
import { UserType } from 'src/global/enum';
import { UserTypes } from 'src/global/decorator/userTypes';
import { User } from 'src/global/decorator/user';
@Controller('admins')
@UsePipes(ValidationPipe)
@UseFilters(HttpExceptionFilter)
@UseInterceptors(TransformInterceptor)
export class AdminsController {
    constructor(
        private readonly adminsService: AdminsService,
    ){}

      // @Login
  @Post('login')
  async login(
    @Body() loginUserDto: LoginAdminDto,
  ) {
    const [login, admin] = await this.adminsService.login(
      loginUserDto
    );
    return { login, admin };
  }

  @UserTypes(UserType.ADMIN)
  @Get('me')
  async me(@User() user) {
      return { admin: user };
  }
}
