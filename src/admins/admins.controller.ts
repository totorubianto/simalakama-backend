import { Controller, UsePipes, UseFilters, UseInterceptors, ValidationPipe, Post, Get } from '@nestjs/common';
import { TransformInterceptor } from '../global/interceptor/transform.interceptor';
import { HttpExceptionFilter } from '../global/filter/http-exception.filter'
import { AdminsService } from './admins.service';

@Controller('admins')
@UsePipes(ValidationPipe)
@UseFilters(HttpExceptionFilter)
@UseInterceptors(TransformInterceptor)
export class AdminsController {
    constructor(
        private readonly adminsService: AdminsService,
    ){}

    @Post('login')
    async login(){
        return "toto"
    }
}
