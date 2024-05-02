import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { CloudinaryService } from "../cloudinary/cloudinary.service";

@Controller()
export class MediaController {
  constructor(private cloudinary: CloudinaryService) {}
  @Post("local")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "public/img",
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        }
      })
    })
  )
  async local(@UploadedFile() file: Express.Multer.File) {
    return file.path;
  }

  @Post("online")
  @UseInterceptors(FileInterceptor("file"))
  async online(@UploadedFile() file: Express.Multer.File) {
    return await this.cloudinary
      .uploadImage(file)
      .then((data) => {
        return {
          statusCode: 200,
          data: data.secure_url
        };
      })
      .catch((err) => {
        return {
          statusCode: 400,
          message: err.message
        };
      });
  }
}