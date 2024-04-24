import { Module } from "@nestjs/common";
import { StudentsService } from "./students.service";
import { StudentsController } from "./students.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentSchema } from "./schemas/student.schema";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
  imports: [
    CacheModule.register({
      ttl: 100000,
      max: 100
    }),
    MongooseModule.forFeature([{ name: "Student", schema: StudentSchema }])
  ],
  controllers: [StudentsController],
  providers: [StudentsService]
})
export class StudentsModule {}
