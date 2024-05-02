import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { StudentsModule } from "./modules/students/students.module";
import appConfig from "./configs/app.config";
import { ScheduleModule } from "@nestjs/schedule";
import { BullModule } from "@nestjs/bull";
import { MailerModule } from "@nestjs-modules/mailer";
import { join } from "path";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { MediaModule } from "./modules/media/media.module";
import { FileModule } from "./modules/file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { CloudinaryModule } from "./modules/cloudinary/cloudinary.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..")
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    StudentsModule,
    MediaModule,
    FileModule,
    ScheduleModule.forRoot(),
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get("MAIL_HOST"),
          secure: false,
          auth: {
            user: config.get("MAIL_USER"),
            pass: config.get("MAIL_PASSWORD")
          }
        },
        defaults: {
          from: `"No Reply" <${config.get("MAIL_FROM")}>`
        },
        template: {
          dir: join(__dirname, "/templates/email"),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      }),
      inject: [ConfigService]
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        redis: {
          host: config.get("REDIS_HOST"),
          port: Number(config.get("REDIS_PORT")),
          password: config.get("REDIS_PASSWORD")
        }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
