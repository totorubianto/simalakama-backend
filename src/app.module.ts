import { Module, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  
})

export class AppModule {}
