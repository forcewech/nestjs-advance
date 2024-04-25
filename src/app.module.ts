import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { StudentsModule } from "./modules/students/students.module";
import appConfig from "./configs/app.config";
import { ScheduleModule } from "@nestjs/schedule";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig]
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    StudentsModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
