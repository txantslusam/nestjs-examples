import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from '../user/user.service';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(user: JwtPayload) {
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: 3600 * 24 * 15,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload) {
    // put some validation logic here
    // for example query user by id/email/username
    const user = await this.userService.findByUuid(payload.uuid);

    if (!user) {
      return;
    }

    if (user.tokenId !== payload.tokenId) {
      return;
    }

    return user;
  }
}
