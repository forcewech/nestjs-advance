import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res } from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { ListClassDto } from "./dto/query-class.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { IStudent } from "./interfaces/student.interface";
import { StudentsService } from "./students.service";

@Controller("students")
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @Post()
  async createStudent(@Body() createStudentDto: CreateStudentDto): Promise<IStudent> {
    return this.studentService.createStudent(createStudentDto);
  }

  @Put("/:id")
  async updateStudent(@Param("id") studentId: string, @Body() updateStudentDto: UpdateStudentDto): Promise<IStudent> {
    return this.studentService.updateStudent(studentId, updateStudentDto);
  }

  @Get()
  async getStudents(): Promise<IStudent[]> {
    return this.studentService.getAllStudents();
  }

  @Get("/:id")
  async getStudent(@Res() response, @Param("id") studentId: string): Promise<IStudent> {
    const student = await this.studentService.getStudent(studentId);
    await response.cookie("studenName", student.name);
    return response.json(student);
  }

  @Get("/classes/get-classes")
  async getClass(@Query() query: ListClassDto) {
    return this.studentService.filterClass(query.classes);
  }

  @Delete("/:id")
  async deleteStudent(@Param("id") studentId: string): Promise<IStudent> {
    return this.studentService.deleteStudent(studentId);
  }

  @Get("/student-cache/:id")
  async getStudentFromCache(@Param("id") studentId: string): Promise<IStudent> {
    return this.studentService.getStudentFromCache(studentId);
  }

  @Get("/axios/test-axios")
  async testAxios(): Promise<any> {
    return this.studentService.testAxios();
  }

  @Get("/cookies/get-cookies")
  async testCookies(@Req() request): Promise<any> {
    return request.cookies;
  }
}
