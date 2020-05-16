import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { EventModule } from '../event/event.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
    EventModule
  ],
  providers: [MessagesService],
  controllers: [MessagesController]
})
export class MessagesModule { }
