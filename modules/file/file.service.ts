import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  handleFileUpload(file: Express.Multer.File): string {
    return `File ${file.filename} successfully uploaded to ${file.path}`;
  }
}
