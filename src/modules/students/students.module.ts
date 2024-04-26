import { Module } from "@nestjs/common";
import { StudentsService } from "./students.service";
import { StudentsController } from "./students.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentSchema } from "./schemas/student.schema";
import { CacheModule } from "@nestjs/cache-manager";
import { HttpModule } from "@nestjs/axios";
import { BullModule } from "@nestjs/bull";
import { EmailProcessor } from "../queues/processors/email.processors";
import { EQueues } from "src/constants/enums/queues.enums";

@Module({
  imports: [
    CacheModule.register({
      ttl: 100000,
      max: 100
    }),
    HttpModule,
    MongooseModule.forFeature([{ name: "Student", schema: StudentSchema }]),
    BullModule.registerQueue({
      name: EQueues.SEND_MAIL
    })
  ],
  controllers: [StudentsController],
  providers: [StudentsService, EmailProcessor]
})
export class StudentsModule {}
