import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { AdminsModule } from '../admins/admins.module';
import { ConfigModule } from '../config/config.module';

@Module({
	imports: [AdminsModule, ConfigModule],
  	providers: [SeedService],
  	exports: [SeedService],
})
export class SeedModule {}
