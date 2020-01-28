import { Field, InputType } from 'type-graphql';
import { Upload } from '../../shared/FileUpload/scalars/Upload.scalar';

@InputType()
export class CreateImageDto {
  @Field(type => Upload)
  imageData?: string;
}
