import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesSchema } from './schemas/companies.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Companies', schema: CompaniesSchema }]),
        AuthModule,
    ],
    controllers: [CompaniesController],
    providers: [CompaniesService],
    exports: [CompaniesService],
})
export class CompaniesModule {}
