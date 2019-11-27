import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from './config/config.service'
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.listen(app.get(ConfigService).getInt('APP_PORT'));
}

bootstrap();
