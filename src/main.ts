import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );
  app.setGlobalPrefix(configService.get<string>("apiPrefix"));
  app.use(cookieParser());
  const port = configService.get<number>("port");
  await app.listen(port);
}
bootstrap();
