import {Global, Module} from '@nestjs/common';
import { Upload } from './scalars/Upload.scalar';
import { S3FileUploadService } from './services/S3FileUpload.service';
import {ConfigModule} from "../../config/config.module";
import {LocalFileUploadService} from "./services/LocalFileUpload.service";

@Global()
@Module({
  imports: [
    ConfigModule,
  ],
  providers: [
    Upload,
    {
      provide: 'S3FileUpload',
      useClass: S3FileUploadService,
    },
    {
      provide: 'LocalFileUpload',
      useClass: LocalFileUploadService,
    },
  ],
  exports: [
    {
      provide: 'S3FileUpload',
      useClass: S3FileUploadService,
    },
    {
      provide: 'LocalFileUpload',
      useClass: LocalFileUploadService,
    },
  ],
})
export class FileUploadModule {}
