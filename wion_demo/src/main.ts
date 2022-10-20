import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  app.use(cookieParser());

  //later, gen config file that embrace port info
  const port = 3000;
  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
  
}
bootstrap();
