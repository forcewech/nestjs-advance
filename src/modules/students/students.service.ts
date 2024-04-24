import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IStudent } from "./interfaces/student.interface";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import * as bcrypt from "bcrypt";
@Injectable()
export class StudentsService {
  constructor(
    @InjectModel("Student") private studentModel: Model<IStudent>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}
  async createStudent(createStudentDto: CreateStudentDto): Promise<IStudent> {
    const newStudent = await new this.studentModel({
      ...createStudentDto,
      password: await bcrypt.hash(createStudentDto.password, 10)
    });
    const studentId = newStudent._id.toString();
    await this.cacheManager.set(`key_${studentId}`, newStudent);
    return newStudent.save();
  }
  async updateStudent(studentId: string, updateStudentDto: UpdateStudentDto): Promise<IStudent> {
    const existingStudent = await this.studentModel.findByIdAndUpdate(studentId, updateStudentDto, { new: true });
    if (!existingStudent) {
      throw new NotFoundException(`Student #${studentId} not found`);
    }
    return existingStudent;
  }
  async getAllStudents(): Promise<IStudent[]> {
    const studentData = await this.studentModel.find();
    if (!studentData || studentData.length == 0) {
      throw new NotFoundException("Students data not found!");
    }
    return studentData;
  }
  async getStudent(studentId: string): Promise<IStudent> {
    const existingStudent = await this.studentModel.findById(studentId).exec();
    if (!existingStudent) {
      throw new NotFoundException(`Student #${studentId} not found`);
    }
    return existingStudent;
  }
  async deleteStudent(studentId: string): Promise<IStudent> {
    const deletedStudent = await this.studentModel.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      throw new NotFoundException(`Student #${studentId} not found`);
    }
    return deletedStudent;
  }
  async getStudentFromCache(studentId: string): Promise<IStudent> {
    const existingStudentFromCache = (await this.cacheManager.get(`key_${studentId}`)) as IStudent;
    if (!existingStudentFromCache) {
      throw new NotFoundException(`Student #${studentId} in cache not found`);
    }
    return existingStudentFromCache;
  }
}
