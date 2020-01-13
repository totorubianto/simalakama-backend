import { Module, Injectable } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VerificationSchema } from './schema/verification.schema';
@Injectable()
@Module({
    imports: [MongooseModule.forFeature([{ name: 'Verification', schema: VerificationSchema }])],
    exports: [VerificationService],
    providers: [VerificationService],
})
export class VerificationModule {}
