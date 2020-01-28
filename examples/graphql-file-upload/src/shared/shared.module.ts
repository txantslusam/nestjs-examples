import { Global, Module } from '@nestjs/common';
import { FileUploadModule } from "./FileUpload/fileUpload.module";

@Global()
@Module({
  imports: [
    FileUploadModule,
  ],
})
export class SharedModule {}
