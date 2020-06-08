import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity as User, UserEntity } from './user.entity';
import { UserService } from './user.service';
import { CurrentUser } from './user.decorator';
import CreateUserInput from './dto/createUser.input';
import { WithJwtTokenUser } from './dto/WithJwtTokenUser.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';

@Resolver(of => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Query(returns => User)
  @UseGuards(JwtAuthGuard)
  async whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Mutation(returns => WithJwtTokenUser)
  async createOrLoginUser(@Args('userData') userData: CreateUserInput) {
    const user = await this.userService.createOrLogin(userData);
    const token = await this.authService.createToken({
      uuid: user.uuid,
      tokenId: await this.userService.getOrGenerateTokenId(user.uuid),
    });

    return new WithJwtTokenUser(
      user,
      token,
    );
  }
}
