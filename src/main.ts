import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe, ValidationError, BadRequestException } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import * as cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors();
    app.use(cookieParser());
    app.useStaticAssets(join(__dirname, '..', 'public'));
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            transformOptions: { enableImplicitConversion: true },
            // disableErrorMessages: true,
            exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
        }),
    );
    console.log(process.env.PORT, app.get(ConfigService).getInt('APP_PORTs'), "ini dia")
    app.listen(process.env.PORT || app.get(ConfigService).getInt('APP_PORT'));
}

bootstrap();
