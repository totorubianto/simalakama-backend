import { Injectable } from '@nestjs/common';
import { User } from '../users/interfaces/user.interface';
import { CreateChatDto } from './dto/create-chat.dto';
import { EventGateway } from '../event/event.gateway';
import { EventType } from '../global/enum/event-type.enum';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './interfaces/message.interface';
@Injectable()
export class MessagesService {
    constructor(
        @InjectModel('Message') private messageModel: Model<Message>,
        private readonly eventGateway: EventGateway
    ) { }
    async create(user: Model<User>, id: string, body: CreateChatDto) {
        console.log(body.message)
        const newMessage = new this.messageModel({
            message: body.message,
            recipient: body.to,
            requester: user._id
        })
        await newMessage.save()
        console.log(newMessage, "hhhh")
        await this.eventGateway.handleNotif(EventType.MESSAGE, newMessage);
    }
}
