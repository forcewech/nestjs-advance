import { Controller, Get, StreamableFile, Res } from "@nestjs/common";
import { createReadStream } from "fs";
import { join } from "path";
import type { Response } from "express";

@Controller("file")
export class FileController {
  @Get()
  getFile(@Res({ passthrough: true }) res: Response): StreamableFile {
    const file = createReadStream(join(process.cwd(), "package.json"));
    res.set({
      "Content-Type": "application/json",
      "Content-Disposition": 'attachment; filename="package.json"'
    });
    return new StreamableFile(file);
  }
}
