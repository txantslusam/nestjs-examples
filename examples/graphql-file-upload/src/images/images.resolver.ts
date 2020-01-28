import {Args, Mutation, Resolver, Query} from '@nestjs/graphql';
import {UseInterceptors, UsePipes} from "@nestjs/common";
import {GraphqlFileFieldInterceptor} from "../shared/FileUpload/interceptors/FileInterceptor";
import {ValidationPipe} from "../shared/pipes/validation.pipe";
import {CreateImageDto} from "./dto/createImage.dto";

@Resolver('Images')
export class ImagesResolver {
  @Query(type => String)
  async image() {
    return 'Hello';
  }
  @Mutation(type => String)
  @UseInterceptors(GraphqlFileFieldInterceptor('image.imageData'))
  @UsePipes(ValidationPipe)
  async createImage(@Args('image') imageData: CreateImageDto): Promise<string> {
    return imageData.imageData;
  }
}
