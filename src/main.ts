import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { setupApp } from './setup-app';


async function bootstrap() {
  const app = await NestFactory.create(AppModule); 1
  await app.listen(8800);
}
bootstrap();
