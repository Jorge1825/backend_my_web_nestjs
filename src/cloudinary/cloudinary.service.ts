import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
    name: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      v2.uploader.upload(
        file.path,
        {
          public_id: `projects/${name}`,
        },
        (error: any, result: any) => {
          if (error) {
            reject();
          } else {
            console.log(result);
            resolve(result);
          }
        },
      );
    });
  }
}
