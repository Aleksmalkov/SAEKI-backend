import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('file')
export class FileController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        // Validate file extension
        if (!file.originalname.match(/\.(step|iges)$/)) {
          return callback(new Error('Only .STEP and .IGES files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: { fileSize: 50 * 1024 * 1024 }, // Set a limit of 50 MB for file size
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { message: 'File uploaded successfully!', filePath: file.path };
  }
}
