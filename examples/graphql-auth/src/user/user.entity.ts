import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  Unique,
  BeforeInsert
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { hash } from 'bcrypt';

import CutString from '../shared/transformers/cutString';
import { UUIDScalar } from '../shared/scalars/UUID.scalar';

@ObjectType('User')
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => UUIDScalar)
  @Column('uuid')
  @Generated('uuid')
  uuid: string;

  @Field()
  @Column('character varying', {
    length: 50,
    unique: true,
    transformer: new CutString(50),
  })
  username: string;

  @Column('int', {
    nullable: true,
  })
  tokenId: number;

  @Column('character varying')
  password: string;

  @BeforeInsert()
  async hashPassword(password: string = this.password) {
    if (!password) {
      return password;
    }
    this.password = await hash(password, 10);
    return this.password;
  }
}
