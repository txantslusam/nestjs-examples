import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TokenData {
  @Field()
  accessToken: string;
  @Field(type => Int)
  expiresIn: number;
}
