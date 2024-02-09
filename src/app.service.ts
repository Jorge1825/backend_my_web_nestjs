import { Injectable, BadRequestException } from '@nestjs/common';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Injectable()
export class AppService {
  constructor(private cloudinary: CloudinaryService) {}
  async uploadImageToCloudinary(file: Express.Multer.File,name: string) {
    return await this.cloudinary.uploadImage(file,name).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }
}