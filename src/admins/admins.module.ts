import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from './schema/admin.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name: 'Admin', schema: AdminSchema}]),
  ],
  controllers: [AdminsController],
  providers: [AdminsService],
  exports:[ AdminsService ]
})
export class AdminsModule {}
