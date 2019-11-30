import { Injectable } from '@nestjs/common';
import * as cron from 'node-cron';
import { VerificationService } from '../verification/verification.service';

@Injectable()
export class CronService {
  constructor(private readonly verificationsService: VerificationService) {}

  async runTask() {
    console.log('Cron service running...');
    cron.schedule('*/5 * * * *', async () => {
      console.log(
        new Date().toLocaleDateString(),
        new Date().toLocaleTimeString(),
        'Clearing expired verification token...',
      );
      this.verificationsService.clearExpired();
    });
  }
}
