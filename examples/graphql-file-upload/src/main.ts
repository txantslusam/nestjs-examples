import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  app.useStaticAssets(join(__dirname, '..', 'static'), {
    prefix: '/static',
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(configService.getNumber('PORT'), '0.0.0.0');
}
bootstrap();
