import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class IncludesPipe implements PipeTransform<any> {
  async transform(value, metadata: ArgumentMetadata) {
    const includes = value['includes[]'];

    if (!includes) {
      return [];
    }

    if (Array.isArray(includes)) {
      return includes;
    }

    return [includes];
  }
}
