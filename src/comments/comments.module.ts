import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesSchema } from 'src/companies/schemas/companies.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Comment', schema: CompaniesSchema }])],
    controllers: [CommentsController],
    providers: [CommentsService],
})
export class CommentsModule {}
