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
    async create(user: Model<User>, body: CreateChatDto) {
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

    async findOne(query: any) {
        const result = await this.messageModel.findOne(query)
        return result
    }

    async find(query: any) {
        const result = await this.messageModel.find(query)
        return result
    }

    async get(user: Model<User>, id: string) {
        const data: Model<Message> = await this.find(
            {
                $or: [
                    { $and: [{ recipient: id }, { requester: user._id }] },
                    { $and: [{ recipient: user._id }, { requester: id }] }
                ]
            }
        )
        return data;
    }
}
