import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ReadStream } from 'fs-capacitor';
import { FileUploadService } from '../interfaces/FileUploadService.interface';

@Injectable()
export class LocalFileUploadService implements FileUploadService {
  private dir = './static';

  constructor() {
    if (!fs.existsSync(this.dir)) {
      fs.mkdirSync(this.dir);
    }
  }

  async uploadFile(filename: string, file: ReadStream) {
    const fileAddress = path.join(this.dir, filename + '.jpg');
    await new Promise((resolve, reject) =>
      file
        .on('error', error => {
          fs.unlinkSync(fileAddress);
          reject(error);
        })
        .pipe(fs.createWriteStream(fileAddress))
        .on('error', error => reject(error))
        .on('finish', () => resolve(filename)),
    );
  }
}
