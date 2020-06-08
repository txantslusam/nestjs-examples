import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import CreateUserInput from './dto/createUser.input';
import { random } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByUuid(userUuid: string) {
    return this.userRepository.findOne({
      uuid: userUuid,
    });
  }
  
  async createOrLogin(userData: CreateUserInput) {
    const user = await this.userRepository.findOne({
      username: userData.username,
    });

    if (user) {
      const passwordMatch = await compare(userData.password, user.password);

      if (!passwordMatch) {
        throw new HttpException({
          message: 'Oops, wrong email or password',
        }, HttpStatus.BAD_REQUEST);
      }

      return user;
    }

    let newUser = this.userRepository.create({
      username: userData.username,
      password: userData.password,
    });

    newUser = await this.userRepository.save(newUser);

    return newUser;
  }

  async getOrGenerateTokenId(userUuid: string) {
    const user = await this.findByUuid(userUuid);

    if (user.tokenId) {
      return user.tokenId;
    }

    user.tokenId = random(0, 10000000);

    this.userRepository.update(user.id, {
      tokenId: user.tokenId,
    });

    return user.tokenId;
  }
}
