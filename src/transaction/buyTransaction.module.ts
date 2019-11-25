import { Module, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { BuyController } from './buyTransaction.controller';
import { BuyService } from './buyTransaction.service';
import { BuyTransactionSchema } from './schema/buyTransaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Buy', schema: BuyTransactionSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  ],
  exports: [BuyService],
  controllers: [BuyController],
  providers: [BuyService],
})
export class BuyModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(AuthMiddleware).forRoutes(UsersController);
  // }
}
