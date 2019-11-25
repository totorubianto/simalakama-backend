import { Module, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ItemModule } from './items/item.module';
import { BuyModule } from './transaction/buyTransaction.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ItemModule,
    BuyModule,
    // harus pakai mongodb replica set atau run-rs
    MongooseModule.forRoot('mongodb://LAPTOP-1UN8TADQ:27019/latihan?replicaSet=rs', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
