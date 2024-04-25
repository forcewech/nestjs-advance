import { Module } from "@nestjs/common";
import { StudentsService } from "./students.service";
import { StudentsController } from "./students.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentSchema } from "./schemas/student.schema";
import { CacheModule } from "@nestjs/cache-manager";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    CacheModule.register({
      ttl: 100000,
      max: 100
    }),
    HttpModule,
    MongooseModule.forFeature([{ name: "Student", schema: StudentSchema }])
  ],
  controllers: [StudentsController],
  providers: [StudentsService]
})
export class StudentsModule {}
