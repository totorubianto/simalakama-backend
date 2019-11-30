import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { VerificationModule } from '../verification/verification.module';

@Module({
  imports: [VerificationModule],
  providers: [CronService],
  exports: [CronService],
})
export class CronModule {}
