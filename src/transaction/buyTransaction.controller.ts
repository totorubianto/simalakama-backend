import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UsePipes,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';

import { BuyService } from './buyTransaction.service';
import { ValidationPipe } from '../middleware/pipe/validate.pipe';
import { RolesGuard } from '../middleware/guard/user.guard';
import { Roles } from '../middleware/decorator/guard.decorator';
import { TransformInterceptor } from '../middleware/interceptor/transform.interceptor';
import { HttpExceptionFilter } from '../middleware/filter/http-exception.filter';
import { AuthGuard } from '@nestjs/passport';
import { UserCustom } from '../middleware/decorator/userLogged.decorator';
import { BuyTransactionDto } from './dto/buyTransaction.dto';

@Controller('buyitem')
@UsePipes(ValidationPipe)
@UseFilters(HttpExceptionFilter)
@UseInterceptors(TransformInterceptor)
@UseGuards(RolesGuard)
export class BuyController {
  constructor(private buyService: BuyService) {}

  //get all
  @Get()
  findAll(): Promise<any[]> {
    return this.buyService.findAll();
  }

  //create transaction
  @Post()
  @UseGuards(AuthGuard())
  @Roles('admin', 'user')
  async create(
    @Body() buyTransactionDto: BuyTransactionDto,
    @UserCustom() user: any,
  ) {
    return await this.buyService.create(buyTransactionDto, user);
  }
}
