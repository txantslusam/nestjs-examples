import { Module } from '@nestjs/common';
import { ImagesResolver } from './images.resolver';

@Module({
  providers: [ImagesResolver]
})
export class ImagesModule {}
