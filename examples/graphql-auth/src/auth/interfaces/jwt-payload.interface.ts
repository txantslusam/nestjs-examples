import { IsNotEmpty } from 'class-validator';

export class JwtPayload {
  @IsNotEmpty()
  uuid: string;
  @IsNotEmpty()
  tokenId: number;
}
