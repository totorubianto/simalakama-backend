import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { EventType } from '../global/enum/event-type.enum';
console.log(parseInt(process.env.APP_PORT) + 1)
@WebSocketGateway(parseInt(process.env.APP_PORT) + 1)
export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('EventGateway');

  handleNotif(event: string, data?: any): void {
    this.server.emit(event, data);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket, ...args: any[]) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.handshake.query.id}`);
    this.handleNotif(EventType.CONNECT, client.handshake.query.id);
  }
}
