import { Field, ObjectType } from '@nestjs/graphql';
import { TokenData } from '../../shared/extendedTypes/withJwtToken.type';
import { UserEntity } from '../user.entity';

@ObjectType()
export class WithJwtTokenUser {
  @Field(type => UserEntity)
  data: UserEntity;

  @Field(type => TokenData)
  token: TokenData;

  constructor(
    data: UserEntity,
    token: TokenData,
  ) {
    this.data = data;
    this.token = token;
  }
}
