import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '../../../config/config.service';
import { ReadStream } from 'fs-capacitor';
import { FileUploadService } from '../interfaces/FileUploadService.interface';

@Injectable()
export class S3FileUploadService implements FileUploadService {
  private s3: S3;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.s3 = new S3({
      region: 'eu-central-1',
      credentials: {
        accessKeyId: this.configService.get('S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadFile(filename: string, file: ReadStream) {
    const params: S3.PutObjectRequest = {
      Bucket: this.configService.getString('S3_BUCKET_NAME'),
      Key: filename,
      Body: file,
    };

    await this.s3.upload(params).promise();
  }
}
